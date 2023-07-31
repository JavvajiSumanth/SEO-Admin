import React from "react";
import NavBarCZ from "../UI/NavBar";
import HeroCZ from "../UI/Hero";
import Header1 from "../UI/Header1";
import Header2 from "../UI/Header2";
import Header3 from "../UI/Header3";
import Header4 from "../UI/Header4";
import { Box } from "@mui/material";

const UI = ({ content, setContent }) => {
  return (
    <Box
      sx={{
        display: {
          xs: "auto",
          md: "grid",
        },
        gridTemplateColumns: "2fr 1fr",
        columnGap: 3,
        rowGap: 5,
      }}
    >
      <NavBarCZ content={content} setContent={setContent} />
      <Box
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
          backgroundImage:
            "url(https://leverageedublog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2020/07/30182024/UX-UI-Design-1024x640.jpg)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></Box>
      <HeroCZ content={content} setContent={setContent} />
      <Box
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
          backgroundImage:
            "url(https://leverageedublog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2020/07/30182024/UX-UI-Design-1024x640.jpg)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></Box>
      <Header1 content={content} setContent={setContent} />
      <Box
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
          backgroundImage:
            "url(https://leverageedublog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2020/07/30182024/UX-UI-Design-1024x640.jpg)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></Box>

      <Header2 content={content} setContent={setContent} />
      <Box
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
          backgroundImage:
            "url(https://leverageedublog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2020/07/30182024/UX-UI-Design-1024x640.jpg)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></Box>
      <Header3 content={content} setContent={setContent} />
      <Box
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
          backgroundImage:
            "url(https://leverageedublog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2020/07/30182024/UX-UI-Design-1024x640.jpg)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></Box>
      <Header4 content={content} setContent={setContent} />
      <Box
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
          backgroundImage:
            "url(https://leverageedublog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2020/07/30182024/UX-UI-Design-1024x640.jpg)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></Box>
    </Box>
  );
};

export default UI;
