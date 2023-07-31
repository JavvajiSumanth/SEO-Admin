import React, { useState } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase/firebase";
import { DeleteRounded } from "@mui/icons-material";
import { deleteObject, ref } from "firebase/storage";

const Banners = () => {
  const [images, setImages] = useState([]);

  React.useEffect(() => {
    const fetchedData = [];

    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "images"));
      querySnapshot.forEach((doc) => {
        fetchedData.push(doc.data());
      });
      setImages(fetchedData);
    }
    fetchData();
  }, []);

  // const updateImages = async (image) => {
  //   console.log(image);
  //   const imagesCopy = [...images];
  //   const filteredData = imagesCopy.map((img) => {
  //     if (img.id === image.id) {
  //       return {
  //         ...img,
  //         selected: !image.selected,
  //       };
  //     } else return img;
  //   });
  //   setImages(filteredData);
  //   try {
  //     const imageRef = doc(db, "images", image.id);

  //     await setDoc(imageRef, { selected: !image.selected }, { merge: true });
  //   } catch (error) {
  //     console.log(error);
  //     setImages(imagesCopy);
  //   }
  // };

  const deleteImage = async (image) => {
    try {
      let storageRef = ref(storage, image.id);

      await deleteObject(storageRef);
      await deleteDoc(doc(db, "images", image.id));
      const filteredData = images.filter((img) => img.id !== image.id);
      setImages(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="banner">
      <ImageList images={images} deleteImage={deleteImage} />
    </div>
  );
};

export default Banners;

const Image = ({ image, deleteImage }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = async () => {
    try {
      navigator.clipboard.writeText(image.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy text to clipboard:", error);
    }
  };
  return (
    <div
      className="file-item"
      style={{
        backgroundImage: `url(${image.url})`,
        minHeight: "400px",
        minWidth: "400px",
        backgroundPosition: "center",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      }}
    >
      <IconButton
        className="file-item-delete-icon"
        aria-label="delete"
        sx={{
          position: "absolute",
          right: 0,
          zIndex: 999,
        }}
        onClick={(e) => {
          e.stopPropagation();
          deleteImage(image);
        }}
      >
        <DeleteRounded
          sx={{
            color: "#ff0000",
          }}
        />
      </IconButton>
      <Box
        className="overlay"
        sx={{
          position: "absolute",
          width: "100%",
          height: "50px",
          backgroundColor: "#000000",
          display: "none",
          bottom: 0,
          placeItems: "center",
          color: "white",
        }}
      >
        <Button
          onClick={handleCopyClick}
          variant="contained"
          sx={{
            backgroundColor: "#fff",
            color: "#000",
          }}
          size="small"
          color="inherit"
        >
          {copied ? "Successfully Copied" : "Copy URL"}
        </Button>
      </Box>
    </div>
  );
};

const ImageList = ({ images, updateImages, deleteImage }) => {
  const renderImage = (image, index) => {
    return (
      <Image
        image={image}
        key={`${image.id}-image`}
        updateImages={updateImages}
        deleteImage={deleteImage}
      />
    );
  };

  return <section className="file-list">{images.map(renderImage)}</section>;
};
