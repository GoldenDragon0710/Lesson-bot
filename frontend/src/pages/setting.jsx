import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Button,
  Avatar,
} from "@material-tailwind/react";
import SettingTab from "@/widgets/tabs/setting_tab";
import TrainingTab from "@/widgets/tabs/training_tab";

export function Setting() {
  return (
    <>
      <div className="relative flex h-full min-h-[100vh] w-full flex-col">
        <div className="container mx-auto h-full w-full px-2 py-5">
          <div className="mb-2 w-full">
            <a href="/">
              <Button
                variant="outlined"
                className="border-2 border-[#7f7f7f] p-2"
              >
                <Avatar src="img/back.svg" className="h-auto w-5" />
              </Button>
            </a>
          </div>
          <Tabs value="training" className="h-full w-full">
            <TabsHeader>
              <Tab value={"setting"}>Setting</Tab>
              <Tab value={"training"}>Training</Tab>
            </TabsHeader>
            <TabsBody className="h-full">
              <TabPanel value={"setting"}>
                <SettingTab />
              </TabPanel>
              <TabPanel value={"training"} className="h-full">
                <TrainingTab />
              </TabPanel>
            </TabsBody>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default Setting;
