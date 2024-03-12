let user = {
    firstName,
    lastName,
    fullName: person.fullName(),
    mailId: faker.internet.email({firstName, lastName}),
    organisation: null, // id referencing organisation document
    organisationName: null,
    role: null,
    priviliges: [null], // list of privileges check config file
    password: null
}
