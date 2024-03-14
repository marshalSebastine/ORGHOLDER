const dbInstance = require("./connection.db");
const dbconfig = require("../../config/dbconfig");
const { ObjectId } = require("mongodb");

class OrgModal {

    async getOrgByName(orgname) {
        await this.setConnection();
        let qry = {name: {$eq: orgname}};
        let options = {projection: {name: true, _id: true, roles: true}}
        return await this.orgCollection.findOne(qry, options);
    }
    async getOrgUsrsByName(orgName) {
        await this.setConnection();
        let qry = { name: {$eq: orgName} };
        console.log("query is", qry)
        let options = {projection: {users: true}}
        return await this.orgCollection.findOne(qry, options);
    }

    async updateOrgWithUserId(id, orgid) {
        await this.setConnection();
        let filter = { _id: orgid}
        let update = { $push: {users: id}}
        return await this.orgCollection.updateOne(filter, update)
    }

    async getOneOrg() {
        await this.setConnection();
        return await this.orgCollection.findOne()
    }

    async setConnection() {
        if(!this.orgCollection) {
            let db = await dbInstance.getDb()
            this.orgCollection = db.collection(dbconfig.orgcollectionname) 
        }
    }

}

module.exports = new OrgModal()