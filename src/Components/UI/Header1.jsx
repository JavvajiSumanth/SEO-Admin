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
  })
  .required();
const Header1 = ({ content, setContent }) => {
  const { benifitSection } = content;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { ...benifitSection },
  });
  const [update, setUpdate] = useState(false);
  const onSubmit = async (data) => {
    const ref = doc(db, "content", "ID");

    await updateDoc(ref, {
      benifitSection: data,
    });
    setContent({
      ...content,
      benifitSection: data,
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
        Benifit Section {update && "[UPDATED]"}
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

        <Button type="submit" variant="contained">
          Update Benifit Section
        </Button>
      </form>
    </div>
  );
};

export default Header1;
