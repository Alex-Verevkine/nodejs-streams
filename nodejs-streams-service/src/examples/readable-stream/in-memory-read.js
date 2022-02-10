const fs = require("fs");
const path = require("path");
// Reading all the
module.exports = async (req, res, next) => {
  try {
    const file = fs.readFileSync(
      path.join(__dirname, "../../../../test-text-file.txt")
    );
    res.contentType("text/plain");
    res.setHeader(
      "Content-disposition",
      "attachment; filename=simple-text.txt"
    );
    res.send(file);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
