import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const schema = yup
  .object({
    metaIcon: yup.string().url().required("Meta Icon must be a valid URL"),
    metaTitle: yup.string().required("Meta Title is a required field"),
    metaDescription: yup
      .string()
      .required("Meta Description is a required field"),
  })
  .required();
const MetaTags = ({ content, setContent }) => {
  const { metaTags } = content;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { ...metaTags },
  });
  const [update, setUpdate] = useState(false);
  const onSubmit = async (data) => {
    const ref = doc(db, "content", "ID");

    await updateDoc(ref, {
      metaTags: data,
    });
    setContent({
      ...content,
      metaTags: data,
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
        Meta Tags {update && "[UPDATED]"}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="outlined-basic"
          label="Meta Icon *"
          variant="outlined"
          fullWidth
          name="metaIcon"
          error={errors.metaIcon}
          {...register("metaIcon")}
        />
        <Typography
          sx={{
            my: 2.5,
            ml: 2,
          }}
          color="red"
        >
          {errors.metaIcon?.message}
        </Typography>

        <TextField
          id="outlined-basic"
          label="Meta Title *"
          name="metaTitle"
          variant="outlined"
          fullWidth
          error={errors.metaTitle}
          {...register("metaTitle")}
        />
        <Typography
          sx={{
            my: 2.5,
            ml: 2,
          }}
          color="red"
        >
          {errors.metaTitle?.message}
        </Typography>

        <TextField
          id="outlined-basic"
          label="Meta Description *"
          variant="outlined"
          fullWidth
          name="metaDescription"
          {...register("metaDescription")}
          error={errors.metaDescription}
        />
        <Typography
          sx={{
            my: 2.5,
            ml: 2,
          }}
          color="red"
        >
          {errors.metaDescription?.message}
        </Typography>

        <Button type="submit" variant="contained">
          Update Meta Tags
        </Button>
      </form>
    </div>
  );
};

export default MetaTags;
