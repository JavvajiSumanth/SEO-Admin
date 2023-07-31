import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const schema = yup
  .object({
    logoImg: yup.string().url("Brand Image must be a valid URL"),
    logoTitle: yup.string().required("Brand Title is a required field"),
    buttonTitle: yup.string().required("Button Title is a required field"),
  })
  .required();
const NavBarCZ = ({ content, setContent }) => {
  const { navData } = content;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { ...navData },
  });
  const [update, setUpdate] = useState(false);
  const onSubmit = async (data) => {
    const ref = doc(db, "content", "ID");

    await updateDoc(ref, {
      navData: data,
    });
    setContent({
      ...content,
      navData: data,
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
        NAVBAR Section {update && "[UPDATED]"}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="outlined-basic"
          label="Brand Image"
          variant="outlined"
          fullWidth
          name="logoImg"
          {...register("logoImg")}
          error={errors.logoImg}
        />
        <Typography
          sx={{
            my: 2.5,
            ml: 2,
          }}
          color="red"
        >
          {errors.logoImg?.message}
        </Typography>
        <TextField
          id="outlined-basic"
          label="Brand Title *"
          variant="outlined"
          fullWidth
          name="logoTitle"
          error={errors.logoTitle}
          {...register("logoTitle")}
        />
        <Typography
          sx={{
            my: 2.5,
            ml: 2,
          }}
          color="red"
        >
          {errors.logoTitle?.message}
        </Typography>

        <TextField
          id="outlined-basic"
          label="Button Title *"
          variant="outlined"
          fullWidth
          name="buttonTitle"
          error={errors.buttonTitle}
          {...register("buttonTitle")}
        />
        <Typography
          sx={{
            my: 2.5,
            ml: 2,
          }}
          color="red"
        >
          {errors.buttonTitle?.message}
        </Typography>

        <Button type="submit" variant="contained">
          Update NavBar
        </Button>
      </form>
    </div>
  );
};

export default NavBarCZ;
