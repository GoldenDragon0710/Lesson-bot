const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const { Document } = require("langchain/document");
const { OpenAIEmbeddings } = require("@langchain/openai");
const { Pinecone } = require("@pinecone-database/pinecone");
const { PineconeStore } = require("@langchain/pinecone");
const fs = require("fs").promises;
const mammoth = require("mammoth");
const path = require("path");
const fse = require("fs-extra");
const db = require("../models");
const Dataset = db.dataset;

exports.trainDataset = async (req, res) => {
  const files = req.files;
  try {
    if (files) {
      await Promise.all(
        files.map(async (file) => {
          let vectorStore = [];

          const filePath = path.join(__dirname, "..", "uploads", file.filename);
          const buffer = await fs.readFile(filePath);
          const result = await mammoth.convertToHtml({ buffer: buffer });

          const regex = /<p><strong>Lesson Title:(.*?)<\/p>/;
          const matches = result.value.match(regex);
          const str = matches ? matches[1] : null;
          const endTagIndex = str.indexOf("</strong>") + "</strong>".length;
          const lesson_title = str.substring(endTagIndex).trim();

          const newRow = await Dataset.create({
            name: file.originalname,
            istrained: false,
            lessonId: generateRandomString(16),
            content: result.value,
            title: lesson_title,
          });

          if (result.value) {
            await splitContent(result.value, newRow.lessonId, vectorStore);
          }

          if (vectorStore) {
            const pinecone = new Pinecone({
              apiKey: process.env.PINECONE_API_KEY,
            });
            const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX);
            await PineconeStore.fromDocuments(
              vectorStore,
              new OpenAIEmbeddings(),
              {
                pineconeIndex,
                maxConcurrency: 5,
                namespace: newRow.lessonId,
              }
            );
          }

          await Dataset.update(
            { istrained: true },
            {
              where: { lessonId: newRow.lessonId },
            }
          );

          const directoryPath = "uploads/" + file.filename;
          await fse.remove(directoryPath);
        })
      );
    }
    const rows = await Dataset.findAll({
      order: [["name", "ASC"]],
      where: { istrained: true },
    });
    return res.status(200).json({ data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getDataset = async (req, res) => {
  try {
    const rows = await Dataset.findAll({
      order: [["name", "ASC"]],
      where: { istrained: true },
    });
    return res.status(200).json({ data: rows });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteDataset = async (req, res) => {
  const { lessonId } = req.body;
  try {
    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
    });
    const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX);
    await pineconeIndex.namespace(lessonId).deleteAll();

    await Dataset.destroy({
      where: { lessonId: lessonId },
    });
    const rows = await Dataset.findAll({
      order: [["name", "ASC"]],
      where: { istrained: true },
    });
    return res.status(200).json({ data: rows });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

function generateRandomString(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

async function splitContent(pageContent, id, vectorStore) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 300,
    chunkOverlap: 20,
  });
  const output = await splitter.createDocuments([pageContent]);

  output.map((item) => {
    vectorStore.push(
      new Document({
        metadata: {
          ...item.metadata,
          id: id.toString(),
        },
        pageContent: item.pageContent,
      })
    );
  });
}
