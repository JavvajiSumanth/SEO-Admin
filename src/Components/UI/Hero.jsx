import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const schema = yup
  .object({
    title: yup.string().required("Title is a required field"),
    subHeading: yup.string().required("Sub Title is a required field"),
    sideImage: yup.string().url("Side Image must be a valid URL"),
    buttonText: yup.string().required("Button Text is a required field"),
    buttonLink: yup.string().url("Button Link must be a valid URL"),
  })
  .required();
const HeroCZ = ({ content, setContent }) => {
  const { heroData } = content;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { ...heroData },
  });
  const [update, setUpdate] = useState(false);
  const onSubmit = async (data) => {
    const ref = doc(db, "content", "ID");

    await updateDoc(ref, {
      heroData: data,
    });
    setContent({
      ...content,
      heroData: data,
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
        HERO Section {update && "[UPDATED]"}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="outlined-basic"
          label="Side Image"
          variant="outlined"
          fullWidth
          name="sideImage"
          {...register("sideImage")}
          error={errors.sideImage}
        />
        <Typography
          sx={{
            my: 2.5,
            ml: 2,
          }}
          color="red"
        >
          {errors.sideImage?.message}
        </Typography>

        <TextField
          id="outlined-basic"
          label="Title *"
          variant="outlined"
          fullWidth
          name="title"
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
          label="Sub Title *"
          variant="outlined"
          fullWidth
          name="subHeading"
          error={errors.subHeading}
          {...register("subHeading")}
        />
        <Typography
          sx={{
            my: 2.5,
            ml: 2,
          }}
          color="red"
        >
          {errors.subHeading?.message}
        </Typography>

        <TextField
          id="outlined-basic"
          label="Button Title *"
          variant="outlined"
          fullWidth
          name="buttonText"
          error={errors.buttonText}
          {...register("buttonText")}
        />
        <Typography
          sx={{
            my: 2.5,
            ml: 2,
          }}
          color="red"
        >
          {errors.buttonText?.message}
        </Typography>

        <TextField
          id="outlined-basic"
          label="Button Link *"
          variant="outlined"
          fullWidth
          name="buttonLink"
          error={errors.buttonLink}
          {...register("buttonLink")}
        />
        <Typography
          sx={{
            my: 2.5,
            ml: 2,
          }}
          color="red"
        >
          {errors.buttonLink?.message}
        </Typography>

        <Button type="submit" variant="contained">
          Update Hero Section
        </Button>
      </form>
    </div>
  );
};

export default HeroCZ;
