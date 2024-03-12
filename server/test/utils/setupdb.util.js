const { startConnection, closeConnection} = require("../../src/db/connection.db");

const setUpDB = () => {
    let client = undefined
    beforeAll(async () => {
        try {
            client = await startConnection()
            console.log('Connection has been established successfully.');
          } catch (error) {
            console.error('Unable to connect to the database:', error);
          }
    })

    afterAll(async () => {
        await closeConnection(client)
    });
}

module.exports = setUpDB