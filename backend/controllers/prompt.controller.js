const db = require("../models");
const Prompt = db.prompt;

exports.getAllPrompts = async (req, res) => {
  try {
    const rows = await Prompt.findAll({
      order: [["name", "ASC"]],
    });
    return res.status(200).json({ data: rows });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.updatePrompts = async (req, res) => {
  const { summarize, standardContent, essentialQues, illustration, quizQues } =
    req.body;

  try {
    if (summarize) {
      await Prompt.update(
        { prompt: summarize },
        {
          where: { name: "summarize" },
        }
      );
    }
    if (standardContent) {
      await Prompt.update(
        { prompt: standardContent },
        {
          where: { name: "standardContent" },
        }
      );
    }
    if (essentialQues) {
      await Prompt.update(
        { prompt: essentialQues },
        {
          where: { name: "essentialQues" },
        }
      );
    }
    if (illustration) {
      await Prompt.update(
        { prompt: illustration },
        {
          where: { name: "illustration" },
        }
      );
    }
    if (quizQues) {
      await Prompt.update(
        { prompt: quizQues },
        {
          where: { name: "quizQues" },
        }
      );
    }
    const rows = await Prompt.findAll({
      order: [["name", "ASC"]],
    });
    return res.status(200).json({ data: rows });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
