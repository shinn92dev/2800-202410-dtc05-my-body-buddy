import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

const client = new MongoClient(uri, options) as any;

async function connectToDatabase() {
  if (!(await client.topology.isConnected())) {
    await client.connect();
  }
  return client;
}

export default connectToDatabase;
