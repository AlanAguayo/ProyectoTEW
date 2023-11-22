const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

class Connection {
  static async open(){
    if (this.db) return this.db;
    const uri = process.env.MONGO_URL;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        this.db = client.db(process.env.DB_NAME)
        console.log("MongoDB database connection success...")
        return this.db;
    } catch (e) {
        console.error(e);
    } finally {
        //await client.close();
    }
  }
}

Connection.db = null;

module.exports = Connection;