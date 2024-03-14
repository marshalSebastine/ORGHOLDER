const request = require("supertest");
const app = require("../../src/app");
const userModel = require("../../src/db/db.user");
const userFixture = require("../fixtures/user.fixture");
const setUpTestDB = require("../utils/setupdb.util");
const { faker } = require('@faker-js/faker');

setUpTestDB()

describe("Auth routes", () => {
    describe("POST /auth/login",() => {

        test("should respond with 400 error code if request body has missing fields", async () => {
            const resp = await request(app).post(`/auth/login`)
            expect(resp.statusCode).toBe(400);
        })

        test("should respond with 400 error code if request body has wrong type of field value", async () => {
            const resp = (await request(app).post(`/auth/login`).send({username: 123,password: 123}))
            expect(resp.statusCode).toBe(400);
        })

        test("invalid email provided", async () => {
            const resp = (await request(app).post(`/auth/login`).send({username: "alertyq82734",password: 23}))
            expect(resp.statusCode).toBe(400);
        })

        test("given mail id that is not registered", async () => {
            let email = "some@gmail.com"
            const resp = (await request(app).post(`/auth/login`).send({username: email,password: "somepass123@Q^&%kajsdgvalidpasswordFormat"}))
            expect(resp.statusCode).toBe(401);
        })

        test("should respond with 200 code and respond with cookie",
            async () => {
                let validUser = await userModel.getAnUser()
                const resp = await request(app).post(`/auth/login/`).send({
                    username: validUser.mailId,
                    password: validUser.password
                })
                expect(resp.header['set-cookie']).toBeDefined()
                expect(resp.statusCode).toBe(200);
            })
    })

    describe("POST /auth/signup", () => {

        test("should throw validation err if the request body do not have all fields and its value", async () => {
            const resp = (await request(app).post("/auth/signup").send({user: {password: "1233"}}))
            expect(resp.statusCode).toBe(400);
        })

        test("should send 409 on existing user mail",async () => {
            let existingUser = await userModel.getAnUser();
            expect(existingUser).toBeDefined();
            delete existingUser._id
            delete existingUser.priviliges
            delete existingUser.organisation
            const resp = (await request(app).post("/auth/signup").send({user: existingUser}))
            expect(resp.statusCode).toBe(409);
        })

        test("should create a valid new user", async() => {
            let newUsers = await userFixture.getUsersData(1);
            user = newUsers[0];
            delete user.priviliges
            delete user.organisation
            expect(user).toBeDefined();
            const resp = (await request(app).post("/auth/signup").send({user: user}))
            expect(resp.statusCode).toBe(200);

        })
    })
})