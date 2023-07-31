import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const schema = yup
  .object({
    pretitle: yup.string().required("Pre Title is a required field"),
    title: yup.string().required("Title is a required field"),
    body: yup.string().required("Body is a required field"),
    videoId: yup.string().required("YouTube Video ID is a required field"),
  })
  .required();
const Header2 = ({ content, setContent }) => {
  const { videoSection, videoId } = content;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { ...videoSection, videoId },
  });
  const [update, setUpdate] = useState(false);
  const onSubmit = async (data) => {
    const ref = doc(db, "content", "ID");

    const { videoId } = data;
    delete data.videoId;

    await updateDoc(ref, {
      videoSection: data,
      videoId,
    });
    setContent({
      ...content,
      videoSection: data,
      videoId,
    });
    setUpdate(true);
  };

  return (
    <div>
      <Typography
        variant="h2"
        textAlign={"center"}
        sx={{
          my: 2,
          textTransform: "uppercase",
          letterSpacing: "1px",
          color: update ? "green" : "",
        }}
      >
        Video Section {update && "[UPDATED]"}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="outlined-basic"
          label="Pre Title *"
          variant="outlined"
          fullWidth
          name="pretitle"
          error={errors.pretitle}
          {...register("pretitle")}
        />
        <Typography
          sx={{
            my: 2.5,
            ml: 2,
          }}
          color="red"
        >
          {errors.pretitle?.message}
        </Typography>

        <TextField
          id="outlined-basic"
          label="Title *"
          name="title"
          variant="outlined"
          fullWidth
          error={errors.title}
          {...register("title")}
        />
        <Typography
          sx={{
            my: 2.5,
            ml: 2,
          }}
          color="red"
        >
          {errors.title?.message}
        </Typography>

        <TextField
          id="outlined-basic"
          label="Body *"
          variant="outlined"
          fullWidth
          name="body"
          {...register("body")}
          error={errors.body}
        />
        <Typography
          sx={{
            my: 2.5,
            ml: 2,
          }}
          color="red"
        >
          {errors.body?.message}
        </Typography>
        <Typography
          sx={{
            my: 2.5,
            ml: 2,
          }}
          color="red"
        >
          {errors.title?.message}
        </Typography>

        <TextField
          id="outlined-basic"
          label="YouTube Video ID *"
          variant="outlined"
          fullWidth
          name="videoId"
          {...register("videoId")}
          error={errors.videoId}
        />
        <Typography
          sx={{
            my: 2.5,
            ml: 2,
          }}
          color="red"
        >
          {errors.videoId?.message}
        </Typography>
        <Button type="submit" variant="contained">
          Update Video Section
        </Button>
      </form>
    </div>
  );
};

export default Header2;
