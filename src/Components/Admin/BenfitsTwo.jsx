import { Button, Checkbox, Switch, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const schema = yup
  .object({
    title: yup.string().required("Title is a required field"),
    desc: yup.string().required("Description is a required field"),
    image: yup.string().url(),
  })
  .required();
const BenefitsTwo = ({ content, setContent }) => {
  const { benefitTwo } = content;
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { ...benefitTwo },
  });
  const [update, setUpdate] = useState(false);
  const onSubmit = async (data) => {
    const ref = doc(db, "content", "ID");
    data.bullets = [
      {
        title: "Mobile Responsive Template",
        desc: "Nextly is designed as a mobile first responsive template.",
        icon: "👀",
      },
      {
        title: "Powered by Next.js & TailwindCSS",
        desc: "This template is powered by latest technologies and tools.",
        icon: "👀",
      },
      {
        title: "Dark & Light Mode",
        desc: "Nextly comes with a zero-config light & dark mode. ",
        icon: "👀",
      },
    ];
    await updateDoc(ref, {
      benefitTwo: data,
    });
    setContent({
      ...content,
      benefitTwo: data,
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
        Bottom Section {update && "[UPDATED]"}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          label="Description *"
          variant="outlined"
          fullWidth
          name="desc"
          error={errors.desc}
          {...register("desc")}
        />
        <Typography
          sx={{
            my: 2.5,
            ml: 2,
          }}
          color="red"
        >
          {errors.desc?.message}
        </Typography>

        <TextField
          id="outlined-basic"
          label="Image URL "
          variant="outlined"
          fullWidth
          name="image"
          {...register("image")}
          error={errors.image}
        />
        <Typography
          sx={{
            my: 2.5,
            ml: 2,
          }}
          color="red"
        >
          {errors.image?.message}
        </Typography>
        <label htmlFor="imgPos">Image Position Left?</label>
        <Controller
          name="imgPos"
          control={control}
          defaultValue={benefitTwo.imgPos}
          render={({ field }) => (
            <Checkbox {...field} defaultChecked={benefitTwo?.imgPos} />
          )}
        />
        <br />

        <Button type="submit" variant="contained">
          Update Benifit Section
        </Button>
      </form>
    </div>
  );
};

export default BenefitsTwo;
