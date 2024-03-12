const { MongoClient, ServerApiVersion } = require("mongodb");
const dbconfig = require("../../config/dbconfig")

const startConnection = async function() {
    const client = new MongoClient(dbconfig.connectionurl,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("Admin").command({ ping: 1 });
    return client
}

const getDatabase = async function() {
    const client = await startConnection()
    const database = client.db(dbconfig.dbname);
    return database
}

const closeConnection = async function(client) {
    await client.close()
}

module.exports = {getDatabase, startConnection, closeConnection}