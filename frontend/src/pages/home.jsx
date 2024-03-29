import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Button, Typography } from "@material-tailwind/react";
import { notification, Select } from "antd";
import { MyLoader } from "@/widgets/loader";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [docText, setDocText] = useState("");
  const [aiResult, setAIResult] = useState("");
  const [aiImage, setAIImage] = useState("");
  const [selectedLessonId, setSelectedLessonId] = useState("");
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const [lessonlist, setLessonList] = useState([]);

  useEffect(() => {
    getLessonList();
  }, []);

  const getLessonList = async () => {
    try {
      setloading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASED_URL}/dataset/`
      );
      setLessonList(response.data.data);
    } catch (err) {
      notification.warning({ message: "Internal Server Error" });
    } finally {
      setloading(false);
    }
  };

  const handleSummarize = async () => {
    try {
      setloading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASED_URL}/doc/summarize`,
        {
          lessonId: selectedLessonId,
        }
      );
      setAIResult(response.data.data);
      setAIImage(null);
    } catch (err) {
      notification.warning({ message: "Internal Server Error" });
    } finally {
      setloading(false);
    }
  };

  const handleContentStandard = async () => {
    try {
      setloading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASED_URL}/doc/content_standard`,
        {
          lessonId: selectedLessonId,
        }
      );
      setAIResult(response.data.data);
      setAIImage(null);
    } catch (err) {
      notification.warning({ message: "Internal Server Error" });
    } finally {
      setloading(false);
    }
  };

  const handleEssentialQuestion = async () => {
    try {
      setloading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASED_URL}/doc/essential_ques`,
        {
          lessonId: selectedLessonId,
        }
      );
      setAIResult(response.data.data);
      setAIImage(null);
    } catch (err) {
      notification.warning({ message: "Internal Server Error" });
    } finally {
      setloading(false);
    }
  };

  const handleIllustration = async () => {
    try {
      setloading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASED_URL}/doc/illustration`,
        {
          lessonId: selectedLessonId,
        }
      );
      setAIImage(response.data.data);
    } catch (err) {
      notification.warning({ message: "Internal Server Error" });
    } finally {
      setloading(false);
    }
  };

  const handleQuizQuestion = async () => {
    try {
      setloading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASED_URL}/doc/quiz_ques`,
        {
          lessonId: selectedLessonId,
        }
      );
      setAIResult(response.data.data);
      setAIImage(null);
    } catch (err) {
      notification.warning({ message: "Internal Server Error" });
    } finally {
      setloading(false);
    }
  };

  const handleSelectLesson = (val) => {
    setDocText(lessonlist[val].content);
    setSelectedLessonId(lessonlist[val].lessonId);
  };

  const handleSetting = () => {
    navigate("/setting");
  };

  return (
    <>
      <div className="relative flex h-full min-h-[100vh] w-full flex-col bg-[#7f7f7f]">
        {loading && <MyLoader isloading={loading} />}
        <div className="container mx-auto flex h-full w-full px-2 py-5">
          <div className="w-1/2 px-5">
            <div className="flex items-center justify-between bg-[#bfbfbf] px-5 py-3">
              <div className="flex items-center">
                <Typography
                  variant="h3"
                  className="mr-8 font-normal normal-case"
                >
                  Lesson
                </Typography>
                <div className="flex w-1/2 cursor-pointer items-center justify-center rounded-lg">
                  <Select
                    placeholder="Select a Lesson"
                    optionFilterProp="children"
                    onChange={handleSelectLesson}
                    filterOption={filterOption}
                    options={lessonlist.map((item, idx) => ({
                      label: item.name,
                      value: idx,
                    }))}
                    className="h-full w-full"
                  />
                </div>
              </div>
              <Button
                variant="outlined"
                onClick={handleSetting}
                className="border-black p-2"
              >
                <Avatar src="img/setting.svg" className="h-5 w-auto" />
              </Button>
            </div>
            <div className="w-full bg-white p-5">
              <div
                dangerouslySetInnerHTML={{
                  __html: docText,
                }}
                className="doc-content text-base text-black"
              />
            </div>
          </div>
          <div className="w-1/2 px-5">
            <div className="w-full pb-10">
              <Button
                variant="outlined"
                onClick={handleSummarize}
                className="border-whtie my-2 flex w-full cursor-pointer items-center border-[1px] px-5 py-2 normal-case"
              >
                <Typography
                  variant="h5"
                  className="text-lg font-normal text-white"
                >
                  Summarize in 2 lines the learner objectives
                </Typography>
              </Button>
              <Button
                variant="outlined"
                onClick={handleContentStandard}
                className="border-whtie my-2 flex w-full cursor-pointer items-center border-[1px] px-5 py-2 normal-case"
              >
                <Typography
                  variant="h5"
                  className="text-lg font-normal text-white"
                >
                  Tell me which content standards relate to reading or writing
                </Typography>
              </Button>
              <Button
                variant="outlined"
                onClick={handleEssentialQuestion}
                className="border-whtie my-2 flex w-full cursor-pointer items-center border-[1px] px-5 py-2 normal-case"
              >
                <Typography
                  variant="h5"
                  className="text-lg font-normal text-white"
                >
                  Re-write essential questions at 3rd grade reading level
                </Typography>
              </Button>
              <Button
                variant="outlined"
                onClick={handleIllustration}
                className="border-whtie my-2 flex w-full cursor-pointer items-center border-[1px] px-5 py-2 normal-case"
              >
                <Typography
                  variant="h5"
                  className="text-lg font-normal text-white"
                >
                  Give me an illustration of any item in learner relevance
                </Typography>
              </Button>
              <Button
                onClick={handleQuizQuestion}
                variant="outlined"
                className="border-whtie my-2 flex w-full cursor-pointer items-center border-[1px] px-5 py-2 normal-case"
              >
                <Typography
                  variant="h5"
                  className="text-lg font-normal text-white"
                >
                  Expand formative assessments into 10 quiz questions
                </Typography>
              </Button>
            </div>
            <div className="w-full bg-white p-5">
              {aiImage ? (
                <Avatar src={aiImage} className="h-auto w-full" />
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: aiResult.includes("\n")
                      ? aiResult.replace(/\n/g, "<br />")
                      : aiResult,
                  }}
                  className="doc-content text-base text-black"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
