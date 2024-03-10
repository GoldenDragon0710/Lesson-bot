import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Button, Typography } from "@material-tailwind/react";
import { notification } from "antd";
import { MyLoader } from "@/widgets/loader";

export function TrainingTab() {
  const [loading, setloading] = useState(false);
  const [fileList, setFilelist] = useState([]);
  const [trainedList, setTrainedList] = useState([]);

  useEffect(() => {
    getTrainedList();
  }, []);

  const getTrainedList = async () => {
    setloading(true);
    await axios
      .get(`${process.env.REACT_APP_BASED_URL}/dataset/`)
      .then((res) => {
        setTrainedList(res.data.data);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
        notification.warning({ message: "Failed training" });
      });
  };

  const handleFileChanger = (e) => {
    let list = [...fileList];
    if (e.target.files.length != 0) {
      for (let i = 0; i < e.target.files.length; i++) {
        list.push(e.target.files[i]);
      }
      setFilelist(list);
    }
  };

  const handleDeleteUpload = (idx) => {
    let list = [...fileList];
    list.splice(idx, 1);
    setFilelist(list);
  };

  const handleTrain = async () => {
    if (fileList.length == 0) {
      notification.warning({ message: "There is no data to train on." });
      return;
    }
    const formData = new FormData();
    fileList.map((file) => {
      formData.append("files", file);
    });
    setloading(true);
    await axios
      .post(`${process.env.REACT_APP_BASED_URL}/dataset/train`, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        notification.success({ message: "Successfully trained" });
        setTrainedList(res.data.data);
        setFilelist([]);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
        notification.warning({ message: "Failed training" });
      });
  };

  const handleDelete = async (idx) => {
    const data = {
      lessonId: trainedList[idx].lessonId,
    };
    setloading(true);
    await axios
      .post(`${process.env.REACT_APP_BASED_URL}/dataset/delete`, data)
      .then((res) => {
        setTrainedList(res.data.data);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
        notification.warning({ message: "Internal Server Error" });
      });
  };

  return (
    <>
      <div className="h-full w-full">
        {loading && <MyLoader isloading={loading} />}
        <div className="container mx-auto flex h-full w-full flex-col items-center p-5">
          <div className="my-5 flex w-full justify-center">
            <div className="flex h-[150px] w-full max-w-[300px] items-center justify-center rounded-lg border-[2px] border-[#7f7f7f]">
              <label
                htmlFor="dropzone-file1"
                className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-white p-2"
              >
                <div className="flex flex-col items-center justify-center p-5 text-center">
                  <Avatar src="/img/upload.svg" className="m-2 h-auto w-6" />
                  <p className="text-lg font-normal">Upload your files here</p>
                  <p className="text-lg font-normal">(.doc, .docx)</p>
                </div>
                <input
                  id="dropzone-file1"
                  type="file"
                  accept=".doc, .docx"
                  onChange={handleFileChanger}
                  className="hidden"
                  multiple
                />
              </label>
            </div>
          </div>
          <div className="flex w-full flex-wrap">
            {fileList &&
              fileList.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className="m-2 w-fit rounded-full border-[1px] border-black pl-4 text-black"
                  >
                    {item.name}
                    <Button
                      onClick={() => handleDeleteUpload(idx)}
                      className="ml-2 rounded-full p-2"
                      variant="text"
                    >
                      <Avatar src="img/delete.svg" className="h-auto w-4" />
                    </Button>
                  </div>
                );
              })}
          </div>
          <div className="my-5 w-full">
            <Button
              onClick={handleTrain}
              variant="outlined"
              className="w-full border-[#7f7f7f]  bg-[#7f7f7f] text-base normal-case text-white"
            >
              Train
            </Button>
          </div>
          {trainedList &&
            trainedList.map((item, idx) => {
              return (
                <div
                  className="flex w-full items-center justify-between border-[1px] border-black px-5 py-2"
                  key={idx}
                >
                  <div className="w-1/2">
                    <Typography className="text-base font-normal">
                      {item.name}
                    </Typography>
                  </div>
                  <div className="flex w-1/2 justify-between">
                    <Typography className="w-fit rounded-md bg-[#00ff00] p-2 text-base font-normal text-black">
                      Trained
                    </Typography>
                    <Typography
                      onClick={() => handleDelete(idx)}
                      className="w-fit cursor-pointer rounded-md bg-[#b60e0e] p-2 text-base font-normal text-white"
                    >
                      Delete
                    </Typography>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default TrainingTab;
