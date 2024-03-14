const request = require("supertest");
const app = require("../../src/app");
const orgModel = require("../../src/db/db.organisation");
const userFixture = require("../fixtures/user.fixture");
const setUpTestDB = require("../utils/setupdb.util");
const { faker } = require('@faker-js/faker');

setUpTestDB()

describe("organisation related routes", () => {
    describe("GET /org/roles",() => {

        test("should respond with 400 error code if query is missing", async () => {
            const resp = await request(app).get(`/org/roles`)
            expect(resp.statusCode).toBe(400);
        })

        test("should respond with roles for valid org", async () => {
            let org = await orgModel.getOneOrg()
            expect(org).toBeDefined()
            const resp = await request(app).get(`/org/roles`).query({orgName: org.name})
            expect(resp.statusCode).toBe(200);
        })
  
    })
})