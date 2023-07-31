import { AppBar, Box, Button, LinearProgress } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Reviews from "../Admin/Reviews";
import Banners from "../Admin/Banners";
import UploadBanners from "../Admin/UploadBanners";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import UI from "./UI";
import FAQ from "../Admin/FAQ";
import MetaTags from "../UI/MetaTags";
import BenefitsTwo from "../Admin/BenfitsTwo";
import BenefitsOne from "../Admin/BenfitsOne";
import { AuthContext } from "../../context/AuthContext";

const Dashboard = () => {
  const [value, setValue] = useState(0);
  const { content, setContent } = useContext(AuthContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!!content)
    return (
      <Box sx={{ width: "100%" }}>
        <AppBar
          position="sticky"
          sx={{
            backgroundColor: "#fff",
            mt: 1,
            top: "80px",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            aria-label="basic tabs example"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              "& .MuiTabs-flexContainer": {
                justifyContent: "space-evenly",
              },
            }}
          >
            <Tab label="UI" {...a11yProps(0)} />
            <Tab label="Benefits" {...a11yProps(1)} />
            <Tab label="Testimonials" {...a11yProps(2)} />
            <Tab label="FAQ" {...a11yProps(3)} />
            <Tab label="Meta Tags" {...a11yProps(4)} />
            <Tab label="All Images" {...a11yProps(5)} />
            <Tab label="Upload Images" {...a11yProps(6)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Box
            sx={{
              mt: 3,
            }}
          >
            <UI content={content} setContent={setContent} />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box
            sx={{
              mt: 3,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap: 6,
            }}
          >
            <BenefitsOne content={content} setContent={setContent} />
            <BenefitsTwo content={content} setContent={setContent} />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Reviews content={content} setContent={setContent} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <FAQ content={content} setContent={setContent} />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <MetaTags content={content} setContent={setContent} />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <Banners />
        </TabPanel>
        <TabPanel value={value} index={6}>
          <UploadBanners />
        </TabPanel>
      </Box>
    );
  else return <LinearProgress />;
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default Dashboard;
