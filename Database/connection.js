const { MongoClient } = require("mongodb");
const connectionString = "mongodb://localhost:27017/CurrencyApp";
const client = new MongoClient(connectionString);
let conn;
try {
  conn = client.connect();
} catch(e) {
  console.error(e);
}
let dbConnection = conn.db("CurrencyApp");
module.exports = dbConnection;