const { Router } = require("express");
const { testController } = require("../controllers");

const router = Router();

router.patch("/", testController.updateEntity);

module.exports = router;
