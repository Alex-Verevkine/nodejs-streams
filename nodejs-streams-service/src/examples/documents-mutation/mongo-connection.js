const { MongoClient, ObjectId } = require("mongodb");

const CONNECTION_STRING = `mongodb://dev_db_user:testingisgood@localhost:27017/?serverSelectionTimeoutMS=500000&authSource=admin&authMechanism=SCRAM-SHA-1&directConnection=true`;

module.exports = async = () => {
  const client = new MongoClient(CONNECTION_STRING);
  return client.connect();
};
