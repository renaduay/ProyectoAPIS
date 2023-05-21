import { MongoClient } from "mongodb";

const connectionString = "mongodb+srv://renataduaygues:Re45072078@programacion3.pnoyn9l.mongodb.net/";

const client = new MongoClient(connectionString);

let conn;
try {
  // Try
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("austral");

export default db;
