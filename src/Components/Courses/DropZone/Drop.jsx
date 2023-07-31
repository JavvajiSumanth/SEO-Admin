import { Typography } from "@mui/material";
import React, { useCallback } from "react";
import uniqid from "uniqid";

import { Dropzone } from "./Dropzone";
import ImageList from "./ImageList";

function Drop({ user, setImage, image }) {
  // const [img, setImg] = useState(image);
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const uid = uniqid();
      const reader = new FileReader();
      reader.onload = function (e) {
        setImage({ src: e.target.result, id: uid, file });
      };
      reader.readAsDataURL(file);
    });
  }, []);

  return (
    <div className="drop">
      {!!image && <ImageList image={image} />}

      <Dropzone onDrop={onDrop} />
    </div>
  );
}

export default Drop;
