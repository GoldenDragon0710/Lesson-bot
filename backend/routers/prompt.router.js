const express = require("express");
const router = express.Router();
const promptController = require("../controllers/prompt.controller");

router.get("/", promptController.getAllPrompts);
router.post("/", promptController.updatePrompts);

module.exports = router;
