const { testService } = require("../services");

const updateEntity = async (req, res, next) => {
  const data = await testService.updateEntity(req.body);
  res.json(data);
};

module.exports = {
  updateEntity,
};
