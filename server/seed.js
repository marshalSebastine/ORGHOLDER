const { MongoClient, ServerApiVersion } = require("mongodb");
const {Roles, Privileges} = require("./config/rolesAndPrevilges.config");
const dotenv = require('dotenv');
const { faker, ro } = require('@faker-js/faker');
const myEnv = dotenv.config();
const dbconfig = require("./config/dbconfig");
// Replace the placeholder with your Atlas connection string
const uri = process.env.DBURL;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db("Admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    const database = client.db(dbconfig.dbname);
    let _orgsseeded = await seedOrgs(database);
    let _users = await seedUsersToOrgs(database);
    console.log("seeding complete.....")
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
async function seedOrgs(db) {
    const orgs = db.collection(dbconfig.orgcollectionname);
    await orgs.deleteMany()
    const orgsData = getOrganisationData(2);
    // Prevent additional documents from being inserted if one fails
    const options = { ordered: true };
    const result = await orgs.insertMany(orgsData, options)
    return result
};
// create num of users in all organisation in the collection, with just one [Roles.admin] account
async function seedUsersToOrgs(db) {
    const orgs = db.collection(dbconfig.orgcollectionname);
    const users = db.collection(dbconfig.usercollectioname);
    await users.deleteMany();
    let orgsInstances = await orgs.find({}, {projection: {_id: true, name: true, roles: true}}).toArray();
    for(let org of orgsInstances) {
        let usersData = getUserData(3);
        let userIds = [];
        for(let user of usersData){
            user.organisation = org._id
            user.organisationName = org.name
            user.priviliges = org.roles[user.role].priviliges;
            // @todo: use transation instead to ensure created user id is inserted in organisation collection
            let usrRes = await users.insertOne(user);
            userIds.push(usrRes.insertedId);
        }
        await orgs.updateOne({_id: {$eq: org._id}}, { $set: {users: userIds}})
    }

}

const getOrganisationData = (num) => {
    let res = new Array(num).fill(null);
    res = res.map((org, _i) => {
        return {
            name: faker.company.name(),
            users: null,
            invitations: null,   // to handle signup inviatation flow [{invitationcode: {mailid, role}}]
            roles: getRandomFromArray(sampleRoles)
        }
    })
    return res
}

const getUserData = (num) => {
    let res = new Array(num).fill(null);
    res = res.map((_val, i) => {
        let person = faker.person;
        let firstName = person.firstName();
        let lastName = person.lastName();
        let role = (i == 0) ? Roles.admin: Roles.user;
        return {
            firstName,
            lastName,
            fullName: person.fullName(),
            mailId: faker.internet.email({firstName, lastName}),
            organisation: null,
            role: role,
            priviliges: null,
            // @todo: use bcrypt to hash the password and store the password only for security.
            password: faker.internet.password() 
        }
    })
    return res;
};
// roles and privileges could depend on the company structure
const sampleRoles = [{[Roles.admin]: { priviliges: [Privileges.readAllUsers, Privileges.readOrg, Privileges.readSelf]}, [Roles.user]: { priviliges: [Privileges.readSelf]}},
                     {[Roles.admin]: { priviliges: [Privileges.readAllUsers, Privileges.readOrg, Privileges.readSelf]}, [Roles.user]: { priviliges: [Privileges.readSelf]}, [Roles.superAdmin]: { priviliges: [Privileges.readAllUsers, Privileges.readOrg, Privileges.readSelf, Privileges.createUser]}}]

function getRandomFromArray(array) {
    if (array.length === 0) {
        console.error("array empty")
        return undefined; // Return undefined if the array is empty
      }
    
      // Generate a random index within the array's length
      const randomIndex = Math.floor(Math.random() * array.length);
    
      // Return the element at the random index
      return array[randomIndex];
}

run().catch(console.dir);
