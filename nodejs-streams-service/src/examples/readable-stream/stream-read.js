const fs = require("fs");
const path = require("path");

// Read a file using stream
module.exports = async (req, res, next) => {
  const fileStream = fs.createReadStream(
    path.join(__dirname, "../../../../test-text-file.txt")
  );

  res.contentType("text/plain");
  res.setHeader("Content-disposition", "attachment; filename=simple-text.txt");

  fileStream.pipe(res);
};
