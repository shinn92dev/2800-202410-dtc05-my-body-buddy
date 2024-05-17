import { MongoClient } from "mongodb";

const uri =
  process.env.MONGODB_URI ||
  `mongodb+srv://saeyoung-park:8kcXkmxWJur1q3jKrAScl1q9O@mybodybuddydb.3gwp6yi.mongodb.net/`;
const options = {};

const client = new MongoClient(uri, options) as any;

async function connectToDatabase() {
  if (!(await client.topology.isConnected())) {
    await client.connect();
  }
  return client;
}

export default connectToDatabase;
