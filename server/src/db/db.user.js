const dbInstance = require("./connection.db");
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


    async insertUser(user) {
        await this.setConnection()
        return await this.userCollection.insertOne(user);
    }

    async deleteUser(id) {
        await this.setConnection();
        let filter = {_id: id}
        return await this.userCollection.deleteOne(filter)
    }
    async getUsersOfID(userIds){
        await this.setConnection()
        return await this.userCollection.find({ _id: { $in: userIds } }).toArray();
    }

    async setConnection() {
        if(!this.userCollection) {
            let db = await dbInstance.getDb()
            this.userCollection = db.collection(dbconfig.usercollectioname) 
        }
    }
}

module.exports = new UserModal();