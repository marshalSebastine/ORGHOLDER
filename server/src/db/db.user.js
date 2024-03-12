const { getDatabase } = require("./connection.db");
const dbconfig = require("../../config/dbconfig");

class UserModal {

    // @todo handle indexing using mailid to get optimum performance
    async getUserWithMail(mailid) {
        await this.setConnection()
        let qry = {mailId: {$eq: mailid}};
        return await this.userCollection.findOne(qry);
    }
    // for testing 
    async getAnUser() {
        await this.setConnection()
        return await this.userCollection.findOne();
    }

    async setConnection() {
        if(!this.userCollection) {
            let db = await getDatabase()
            this.userCollection = db.collection(dbconfig.usercollectioname) 
        }
    }
}

module.exports = new UserModal();