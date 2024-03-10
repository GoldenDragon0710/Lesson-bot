const OpenAI = require("openai");
require("dotenv").config();
const db = require("../models");
const Prompt = db.prompt;
const Dataset = db.dataset;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
});

exports.summarize = async (req, res) => {
  const { lessonId } = req.body;
  try {
    const prompt_row = await Prompt.findOne({
      where: { name: "summarize" },
    });
    const lesson_row = await Dataset.findOne({
      where: { lessonId: lessonId },
    });
    let msgs = [
      {
        role: "system",
        content: `For the lesson titled ${lesson_row.title}, ${prompt_row.prompt}`,
      },
      { role: "user", content: lesson_row.content },
    ];
    const completion = await openai.chat.completions.create({
      messages: msgs,
      model: "gpt-3.5-turbo",
    });
    return res
      .status(200)
      .json({ data: completion.choices[0].message.content });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.contentStandard = async (req, res) => {
  const { lessonId } = req.body;
  try {
    const prompt_row = await Prompt.findOne({
      where: { name: "standardContent" },
    });
    const lesson_row = await Dataset.findOne({
      where: { lessonId: lessonId },
    });
    let msgs = [
      {
        role: "system",
        content: `For the lesson titled ${lesson_row.title}, ${prompt_row.prompt}`,
      },
      { role: "user", content: lesson_row.content },
    ];
    const completion = await openai.chat.completions.create({
      messages: msgs,
      model: "gpt-3.5-turbo",
    });
    return res
      .status(200)
      .json({ data: completion.choices[0].message.content });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.essentialQues = async (req, res) => {
  const { lessonId } = req.body;
  try {
    const prompt_row = await Prompt.findOne({
      where: { name: "essentialQues" },
    });
    const lesson_row = await Dataset.findOne({
      where: { lessonId: lessonId },
    });
    let msgs = [
      {
        role: "system",
        content: `For the lesson titled ${lesson_row.title}, ${prompt_row.prompt}`,
      },
      { role: "user", content: lesson_row.content },
    ];
    const completion = await openai.chat.completions.create({
      messages: msgs,
      model: "gpt-3.5-turbo",
    });
    return res
      .status(200)
      .json({ data: completion.choices[0].message.content });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.illustration = async (req, res) => {
  const { lessonId } = req.body;
  try {
    const prompt_row = await Prompt.findOne({
      where: { name: "illustration" },
    });
    const lesson_row = await Dataset.findOne({
      where: { lessonId: lessonId },
    });
    let msgs = [
      {
        role: "system",
        content: `For the lesson titled ${lesson_row.title}, ${prompt_row.prompt}`,
      },
      { role: "user", content: lesson_row.content },
    ];
    const completion = await openai.chat.completions.create({
      messages: msgs,
      model: "gpt-3.5-turbo",
    });
    const image_prompt = completion.choices[0].message.content;
    const image_completion = await openai.images.generate({
      model: "dall-e-3",
      prompt: image_prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });
    const image_url = image_completion.data[0].url;
    return res.status(200).json({ data: image_url });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.quizQues = async (req, res) => {
  const { lessonId } = req.body;
  try {
    const prompt_row = await Prompt.findOne({
      where: { name: "quizQues" },
    });
    const lesson_row = await Dataset.findOne({
      where: { lessonId: lessonId },
    });
    let msgs = [
      {
        role: "system",
        content: `For the lesson titled ${lesson_row.title}, ${prompt_row.prompt}`,
      },
      { role: "user", content: lesson_row.content },
    ];
    const completion = await openai.chat.completions.create({
      messages: msgs,
      model: "gpt-3.5-turbo",
    });
    return res
      .status(200)
      .json({ data: completion.choices[0].message.content });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
