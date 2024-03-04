const express = require("express");
const router = express.Router();
const apiController = require("../controllers/api.controller");

router.post("/summarize", apiController.summarize);
router.post("/content_standard", apiController.contentStandard);
router.post("/essential_ques", apiController.essentialQues);
router.post("/illustration", apiController.illustration);
router.post("/quiz_ques", apiController.quizQues);

module.exports = router;
