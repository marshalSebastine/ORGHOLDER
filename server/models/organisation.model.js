let org = {
        name: faker.company.name(),
        users: null,
        invitations: null,   // to handle signup inviatation flow [{invitationcode: {mailid, role}}]
        roles: null // of types roles
}

let roles = {
    admin: { priviliges: ["readAllUsers", "readOrg", "readSelf"]}, user: { priviliges: ["readSelf"]}
}

let somePrivileges = ["readAllUsers", "readOrg", "readSelf"]

