import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Textarea, Typography } from "@material-tailwind/react";
import { notification, Select } from "antd";
import { MyLoader } from "@/widgets/loader";

export function SettingTab() {
  const [loading, setloading] = useState(false);
  const [summarize, setSummarize] = useState("");
  const [summarizeflag, setSummarizeFlag] = useState(false);
  const [standardContent, setStandardContent] = useState("");
  const [standardContentflag, setStandardContentFlag] = useState(false);
  const [essentialQues, setEssentialQues] = useState("");
  const [essentialQuesflag, setEssentialQuesFlag] = useState(false);
  const [illustration, setIllustration] = useState("");
  const [illustrationflag, setIllustrationFlag] = useState(false);
  const [quizQues, setQuizQues] = useState("");
  const [quizQuesflag, setQuizQuesFlag] = useState(false);

  useEffect(() => {
    getPrompts();
  }, []);

  const getPrompts = async () => {
    try {
      setloading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASED_URL}/prompt`
      );
      if (response.data.data) {
        setEssentialQues(response.data.data[0].prompt);
        setIllustration(response.data.data[1].prompt);
        setQuizQues(response.data.data[2].prompt);
        setStandardContent(response.data.data[3].prompt);
        setSummarize(response.data.data[4].prompt);
      }
    } catch (err) {
      notification.warning({ message: "Internal Server Error" });
    } finally {
      setloading(false);
    }
  };

  const handleSave = async () => {
    try {
      const data = {
        summarize: summarize,
        standardContent: standardContent,
        essentialQues: essentialQues,
        illustration: illustration,
        quizQues: quizQues,
      };

      setloading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASED_URL}/prompt`,
        data
      );
      if (response.data.data) {
        setEssentialQues(response.data.data[0].prompt);
        setIllustration(response.data.data[1].prompt);
        setQuizQues(response.data.data[2].prompt);
        setStandardContent(response.data.data[3].prompt);
        setSummarize(response.data.data[4].prompt);
      }
    } catch (err) {
      notification.warning({ message: "Internal Server Error" });
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      <div className="h-full w-full">
        {loading && <MyLoader isloading={loading} />}
        <div className="container mx-auto flex h-full w-full items-end justify-center px-5">
          <div className="mt-5 flex w-2/3 flex-col">
            <Typography variant="h4" className="mx-2">
              Prompts
            </Typography>
            <div className="my-2 w-full">
              <Textarea
                value={summarize}
                onChange={(e) => setSummarize(e.target.value)}
                label="Summarize in 2 lines the learner objectives"
                className="w-full"
              />
            </div>
            <div className="my-2 w-full">
              <Textarea
                value={standardContent}
                onChange={(e) => setStandardContent(e.target.value)}
                label="Tell me which content standards relate to reading or writing"
                className="w-full"
              />
            </div>
            <div className="my-2 w-full">
              <Textarea
                value={essentialQues}
                onChange={(e) => setEssentialQues(e.target.value)}
                label="Re-write essential questions at 3rd grade reading level"
                className="w-full"
              />
            </div>
            <div className="my-2 w-full">
              <Textarea
                value={illustration}
                onChange={(e) => setIllustration(e.target.value)}
                label="Give me an illustration of any item in learner relevance"
                className="w-full"
              />
            </div>
            <div className="mt-2 w-full">
              <Textarea
                value={quizQues}
                onChange={(e) => setQuizQues(e.target.value)}
                label="Expand formative assessments into 10 quiz questions"
                className="w-full"
              />
            </div>
            <div className="my-2 w-full">
              <Button
                onClick={handleSave}
                variant="outlined"
                className="w-full border-[#7f7f7f]  bg-[#7f7f7f] text-base normal-case text-white"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SettingTab;
