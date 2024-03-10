const express = require("express");
const router = express.Router();
const datasetController = require("../controllers/dataset.controller");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const DIR = "./uploads/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "application/msword" ||
      file.mimetype ==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .doc, .docx format allowed!"));
    }
  },
});

router.get("/", datasetController.getDataset);
router.post("/delete", datasetController.deleteDataset);
router.post("/train", upload.array("files"), datasetController.trainDataset);

module.exports = router;
