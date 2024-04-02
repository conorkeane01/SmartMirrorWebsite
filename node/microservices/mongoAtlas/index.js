console.log("Starting MongoDB Atlas connection...");

const { MongoClient, ServerApiVersion } = require('mongodb');



async function run() {
  console.log("Inside run function...");
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  try {
    // Connect to MongoDB Atlas
    console.log("Connecting to MongoDB Atlas...");
    await client.connect();
    console.log("Connected to MongoDB Atlas!");

    // Print details of the cluster
    console.log("Listing databases...");
    await listDatabases(client);
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    // Close the client when done
    console.log("Closing MongoDB Atlas connection...");
    await client.close();
  }
}

async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();
  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

run().catch(console.error);
