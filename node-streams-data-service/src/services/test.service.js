const { ObjectId } = require("mongodb");
const { omit } = require("lodash");
const mongoConnection = require("./db.service");

const updateEntity = async (entity) => {
  const client = await mongoConnection();
  console.log("update", entity);
  return client
    .db("local-testing-db")
    .collection("test-collection")
    .updateOne(
      {
        _id: ObjectId(entity._id),
      },
      { $set: omit(entity, ["_id"]) }
    );
};

module.exports = {
  updateEntity,
};
