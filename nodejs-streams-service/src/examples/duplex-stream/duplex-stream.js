const { PassThrough, Duplex, Readable } = require("stream");
const { createWriteStream } = require("fs");
const path = require("path");

const readStream = new Readable({
  read() {},
});

const writeFileStream = createWriteStream(path.join(__dirname, "/output"));

class Throttle extends Duplex {
  /*
   * Class constructor will receive the injections as parameters.
   */
  constructor(time) {
    super();
    this.delay = time;
  }
  _read() {}

  // Writes the data, push and set the delay/timeout
  _write(chunk, encoding, callback) {
    this.push(chunk);
    setTimeout(callback, this.delay);
  }

  // When all the data is done passing, it stops.
  _final() {
    this.push(null);
  }
}

// Creating a tunnel to print out an amount of bytes passed in a chunk.
const tunnel = new PassThrough();
// Creating a throttle (Duplex) stream instance with a timeout of 10 sec.
const throttle = new Throttle(10000);

let amount = 0;
tunnel.on("data", (chunk) => {
  amount += chunk.length;
  console.log("bytes:", amount);
});

readStream.pipe(throttle).pipe(tunnel).pipe(writeFileStream);

// Receives a user input and store it inside a file with a throttle of 10 seconds.
module.exports = (req, res, next) => {
  readStream.push(req.body);

  res.sendStatus(200);
};
