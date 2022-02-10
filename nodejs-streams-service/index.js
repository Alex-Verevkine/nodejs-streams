const express = require("express");
const port = 3000;
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(bodyParser.text({ limit: "50mb", extended: true }));

app.get(
  "/read-without-stream",
  require("./src/examples/readable-stream/in-memory-read")
);

app.get(
  "/read-with-stream",
  require("./src/examples/readable-stream/stream-read")
);

app.post(
  "/write-to-file",
  require("./src/examples/writable-stream/writable-stream")
);

app.post(
  "/write-with-throttle",
  require("./src/examples/duplex-stream/duplex-stream")
);

app.post(
  "/write-upper-cased",
  require("./src/examples/transform-stream/transform-stream")
);

app.get(
  "/manipulate-title-batch",
  require("./src/examples/documents-mutation/in-memory-migration")
);

app.get(
  "/manipulate-title-stream",
  require("./src/examples/documents-mutation/stream-migration")
);

app.get(
  "/generate-seed",
  require("./src/examples/documents-mutation/mongo-seed").createSeedData
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
