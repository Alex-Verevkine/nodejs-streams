const mongoConnection = require("./mongo-connection");
const Chance = require("chance");

const chance = new Chance();

createSeedData = async (req, res, next) => {
  try {
    const mockData = [];
    const description = chance.paragraph({ sentences: 1 });
    for (let index = 0; index < 2000; index++) {
      mockData.push({
        name: `test_${1}`,
        description,
      });
    }
    const client = await mongoConnection();
    const db = client.db("local-testing-db");

    const isCollectionExists = (await db.listCollections().toArray()).some(
      ({ name: collectionName }) => collectionName === "test-collection"
    );

    if (isCollectionExists) {
      await db.collection("test-collection").deleteMany();
    } else {
      await db.createCollection("test-collection");
    }

    await db.collection("test-collection").insertMany(mockData);

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createSeedData,
};
