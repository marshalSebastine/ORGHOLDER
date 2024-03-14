const dbInstance = require("../../src/db/connection.db");

const setUpDB = () => {
    beforeAll(async () => {
        try {
            await dbInstance.getDb()
            console.log('Connection has been established successfully.');
          } catch (error) {
            console.error('Unable to connect to the database:', error);
          }
    })

    afterAll(async () => {
        await dbInstance.closeConnection()
    });
}

module.exports = setUpDB