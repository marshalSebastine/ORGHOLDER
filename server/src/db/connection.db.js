const { MongoClient, ServerApiVersion } = require("mongodb");
const dbconfig = require("../../config/dbconfig")

class DBManager {
    
    constructor(){
        this.db = null;
        this.client = null;
    }

    async startConnection() {
        const client = new MongoClient(dbconfig.connectionurl,  {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
        console.log("trying to connect client", this.client, this.db)
        await client.connect();
        console.log("client connected")
        // Send a ping to confirm a successful connection
        await client.db("Admin").command({ ping: 1 });
        return client
    }

    async getDb() {
        if(this.db == null){
            if(this.client == null){
                this.client = await this.startConnection();
            }
            this.db = this.client.db(dbconfig.dbname);
        }
        return this.db
    }

    async closeConnection() {
        if(this.client){
            await this.client.close()
            this.client = null;
            this.db = null;
        }
        this.db = null;
    }
}

module.exports = new DBManager()