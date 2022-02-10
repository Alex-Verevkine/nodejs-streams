const axios = require("axios");
const { Transform } = require("stream");
const through2Concurrent = require("through2-concurrent");
const mongoConnection = require("./mongo-connection");
const { createSeedData } = require("./mongo-seed");

// Transforms the name of the document to an uppercase one.
const transformStream = new Transform({
  writableObjectMode: true,
  readableObjectMode: true,
  transform: (chunk, encoding, callback) => {
    transformStream.push({
      ...chunk,
      name: chunk.name.toUpperCase(),
    });
    callback();
  },
});

module.exports = async (req, res, next) => {
  console.log("Started");
  const client = await mongoConnection();
  const collection = client
    .db("local-testing-db")
    .collection("test-collection");

  // Mongo db Readable stream.
  const dbStream = await collection.find({}).stream();

  dbStream
    .pipe(transformStream)
    .pipe(
      // Process documents from the stream in concurrent mode by defined maxConcurrency number.
      through2Concurrent.obj(
        { maxConcurrency: 100 },
        async function (chunk, enc, callback) {
          await axios.patch("http://localhost:5000/test", chunk);
          this.push(chunk);
          callback();
        }
      )
    )
    .on("data", (data) => {
      console.log(
        `Entity with with ID = ${data._id.toString()} updated successfully`
      );
    })
    .on("end", function () {
      console.log("Finished");
      res.sendStatus(200);
    });
};
