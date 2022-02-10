const { Readable, Transform } = require("stream");
const { createWriteStream } = require("fs");
const path = require("path");

const readStream = new Readable({
  read() {},
});

const transformStream = new Transform({
  transform: (chunk, encoding, callback) => {
    transformStream.push(chunk.toString().toUpperCase());
    callback();
  },
});

const writeFileStream = createWriteStream(path.join(__dirname, "/output"));

readStream.pipe(transformStream).pipe(writeFileStream);

// Receives a user input change it to upper cased text by using a Transform stream and store it inside a fle.
module.exports = (req, res, next) => {
  readStream.push(req.body);

  res.sendStatus(200);
};
