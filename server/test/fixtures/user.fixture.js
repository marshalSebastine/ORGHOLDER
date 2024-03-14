const OrgModal = require("../../src/db/db.organisation");
const {Roles, Privileges} = require("../../../server/config/rolesAndPrevilges.config");
const { faker } = require('@faker-js/faker');

const getUsersData = async (num) => {
    let res = new Array(num).fill(null);
    let org = await OrgModal.getOneOrg();
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
            organisation: org._id,
            organisationName: org.name,
            role: role,
            priviliges: null,
            // @todo: use bcrypt to hash the password and store the password only for security.
            password: faker.internet.password() 
        }
    })
    return res;
};

module.exports = {getUsersData}