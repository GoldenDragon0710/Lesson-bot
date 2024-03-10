const express = require("express");
const router = express.Router();
const docController = require("../controllers/doc.controller");

router.post("/summarize", docController.summarize);
router.post("/content_standard", docController.contentStandard);
router.post("/essential_ques", docController.essentialQues);
router.post("/illustration", docController.illustration);
router.post("/quiz_ques", docController.quizQues);

module.exports = router;
