const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
});

exports.summarize = async (req, res) => {
  const { docText } = req.body;
  let msgs = [
    { role: "system", content: "Summarize in 2 lines the learner objectives" },
    { role: "user", content: docText },
  ];
  try {
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

exports.contentStandard = async (req, res) => {
  const { docText } = req.body;
  let msgs = [
    {
      role: "system",
      content: "Tell me which content standards relate to reading or writing",
    },
    { role: "user", content: docText },
  ];
  try {
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
  const { docText } = req.body;
  let msgs = [
    {
      role: "system",
      content: "Re-write essential questions at 3rd grade reading level",
    },
    { role: "user", content: docText },
  ];
  try {
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
  const { docText } = req.body;
  let msgs = [
    {
      role: "system",
      content:
        "Please extract the summary key point for an illustration from the learner relevance",
    },
    { role: "user", content: docText },
  ];
  try {
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
  const { docText } = req.body;
  let msgs = [
    {
      role: "system",
      content: "Expand formative assessments into 10 quiz questions",
    },
    { role: "user", content: docText },
  ];
  try {
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
