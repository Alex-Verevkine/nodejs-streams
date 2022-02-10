const cluster = require("cluster");

const numberOfWorkers = 2;

if (cluster.isMaster) {
  for (var i = 0; i < numberOfWorkers; i++) {
    cluster.fork();
  }
} else {
  const express = require("express");

  const port = 5000;
  const app = express();
  const bodyParser = require("body-parser");
  const { testRouter } = require("./src/routes");

  app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
  app.use(bodyParser.json({ limit: "50mb", extended: true }));
  app.use("/test", testRouter);
  app.listen(port, () => {
    console.log(`Worker ${cluster.worker.id} is running on port: ${port}`);
  });
}
