const request = require("supertest");
const app = require("../../src/app");
const userModel = require("../../src/db/db.user");
const setUpTestDB = require("../utils/setupdb.util");

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
})