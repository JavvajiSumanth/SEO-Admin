import React from "react";

const ImageList = ({ image }) => {
  return (
    <section className="file-list">
      <div className="file-item">
        <img
          loading="lazy"
          alt={`img -${image.id} `}
          src={image.src}
          className="file-img"
        />
      </div>
    </section>
  );
};

export default ImageList;
