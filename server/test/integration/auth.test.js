const request = require("supertest");
const app = require("../../src/app");
const userModel = require("../../src/db/db.user");
const setUpTestDB = require("../utils/setupdb.util");

setUpTestDB()

describe("Auth routes", () => {
    describe("POST /auth/login/${orgName}",() => {

        test("should respond with 400 error code if request body has missing fields", async () => {
            let validUser = await userModel.getAnUser()
            let orgName = validUser.organisationName
            const resp = await request(app).post(`/auth/login/${orgName}`)
            expect(resp.statusCode).toBe(400);
        })

        test("should respond with 400 error code if request body has wrong type of field value", async () => {
            let validUser = await userModel.getAnUser()
            let orgName = validUser.organisationName
            const resp = (await request(app).post(`/auth/login/${orgName}`).send({username: 123,password: 123}))
            expect(resp.statusCode).toBe(400);
        })

        test("invalid email provided", async () => {
            let validUser = await userModel.getAnUser()
            let orgName = validUser.organisationName
            const resp = (await request(app).post(`/auth/login/${orgName}`).send({username: "alertyq82734",password: 23}))
            expect(resp.statusCode).toBe(400);
        })

        test("given mail id that is not registered", async () => {
            let validUser = await userModel.getAnUser()
            let orgName = validUser.organisationName
            let email = "some@gmail.com"
            const resp = (await request(app).post(`/auth/login/${orgName}`).send({username: email,password: "somepass123@Q^&%kajsdgvalidpasswordFormat"}))
            expect(resp.statusCode).toBe(401);
        })

        test("should respond with 200 code and respond with cookie",
            async () => {
                let validUser = await userModel.getAnUser()
                let orgName = validUser.organisationName
                const resp = await request(app).post(`/auth/login/${orgName}`).send({
                    username: validUser.mailId,
                    password: validUser.password
                })
                expect(resp.header['set-cookie']).toBeDefined()
                expect(resp.statusCode).toBe(200);
            })
    })
})