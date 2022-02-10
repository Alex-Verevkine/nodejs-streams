const Stream = require("stream");
const fs = require("fs");
const path = require("path");

const readableStream = new Stream.Readable({
  read() {},
});

const writeFileStream = fs.createWriteStream(path.join(__dirname, "/output"));

readableStream.pipe(writeFileStream);

writeFileStream.on("error", function (err) {
  console.log("Write to a file error", err);
});

// Receives user input and store it inside a file by using Writable stream.
module.exports = async (req, res, next) => {
  readableStream.push(req.body);

  res.sendStatus(200);
};
