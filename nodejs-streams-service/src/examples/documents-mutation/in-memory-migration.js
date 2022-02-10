const axios = require("axios");
const mongoConnection = require("./mongo-connection");
const { createSeedData } = require("./mongo-seed");

// Slice an array to chunks of defined size.
const chunkArrayInGroups = (arr, size) => {
  var myArray = [];
  for (var i = 0; i < arr.length; i += size) {
    myArray.push(arr.slice(i, i + size));
  }
  return myArray;
};

module.exports = async (req, res, next) => {
  console.log("Started");
  const client = await mongoConnection();
  const collection = client
    .db("local-testing-db")
    .collection("test-collection");

  // Retrieves all the documents from a mongo db collection.
  const entities = await collection.find({}).toArray();

  // Creates a new array with changed documents names to uppercase ones.
  const changedEntities = entities.map((entity) => ({
    ...entity,
    name: entity.name.toUpperCase(),
  }));

  // Split documents to chunks of 100.
  const changedChunks = chunkArrayInGroups(changedEntities, 100);

  // Iterate over chunks.
  for (const changedChunk of changedChunks) {
    await Promise.all(
      // Map chunk's documents to an update request.
      changedChunk.map((entity) =>
        axios.patch("http://localhost:5000/test", entity)
      )
    );
  }
  res.sendStatus(200);

  console.log("Finished");
};
