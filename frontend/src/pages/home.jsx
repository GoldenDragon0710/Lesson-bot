import React, { useState } from "react";
import mammoth from "mammoth";
import axios from "axios";
import { Avatar, Button, Typography } from "@material-tailwind/react";
import { notification } from "antd";
import { MyLoader } from "@/widgets/loader";

export function Home() {
  const [loading, setloading] = useState(false);
  const [docText, setDocText] = useState("");
  const [lessonTitle, setLessonTitle] = useState("");
  const [aiResult, setAIResult] = useState("");
  const [aiImage, setAIImage] = useState("");

  const handleFileChanger = (e) => {
    const file = event.target.files[0];
    if (file) {
      var reader = new FileReader();

      reader.onload = function (event) {
        var arrayBuffer = event.target.result;

        mammoth
          .convertToHtml({ arrayBuffer: arrayBuffer })
          .then(function (result) {
            setDocText(result.value);
          })
          .catch(function (err) {
            console.log(err);
          });
        setLessonTitle(file.name);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const handleSummarize = async () => {
    try {
      setloading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASED_URL}/summarize`,
        {
          docText: docText,
        }
      );
      setAIResult(response.data.data);
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
        `${process.env.REACT_APP_BASED_URL}/content_standard`,
        {
          docText: docText,
        }
      );
      setAIResult(response.data.data);
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
        `${process.env.REACT_APP_BASED_URL}/essential_ques`,
        {
          docText: docText,
        }
      );
      setAIResult(response.data.data);
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
        `${process.env.REACT_APP_BASED_URL}/illustration`,
        {
          docText: docText,
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
        `${process.env.REACT_APP_BASED_URL}/quiz_ques`,
        {
          docText: docText,
        }
      );
      setAIResult(response.data.data);
    } catch (err) {
      notification.warning({ message: "Internal Server Error" });
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      <div className="relative flex h-full min-h-[100vh] w-full flex-col bg-[#7f7f7f]">
        {loading && <MyLoader isloading={loading} />}
        <div className="container mx-auto flex h-full w-full px-2 py-5">
          <div className="w-1/2 px-5">
            <div className="flex items-center justify-center bg-[#bfbfbf] px-5 py-3">
              <Typography variant="h3" className="mr-8 font-normal normal-case">
                Lesson
              </Typography>
              <label
                htmlFor="dropzone-file1"
                className="flex w-1/2 cursor-pointer flex-col items-center justify-center rounded-lg border-[1px] border-black"
              >
                <div className="flex items-center justify-center p-2 text-center">
                  <Avatar src="/img/upload.svg" className="m-2 h-auto w-5" />
                  <p className="text-lg font-normal">Upload Lesson file here</p>
                </div>
                <input
                  id="dropzone-file1"
                  type="file"
                  accept=".doc,.docx"
                  onChange={handleFileChanger}
                  className="hidden"
                />
              </label>
            </div>
            {lessonTitle && (
              <div className="w-full border-y-[1px] border-black bg-[#bfbfbf] px-5">
                {lessonTitle}
              </div>
            )}
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
              {aiImage && <Avatar src={aiImage} className="h-auto w-full" />}
              <div
                dangerouslySetInnerHTML={{
                  __html: aiResult.includes("\n")
                    ? aiResult.replace(/\n/g, "<br />")
                    : aiResult,
                }}
                className="doc-content text-base text-black"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
