import React from "react";

export default function BrandMark({ onDark = false }) {
  return (
    <img
      className="brand-mark"
      src={
        onDark ? "/logo/MedixoEmblemWhite.svg" : "/logo/MedixoEmblemDark.svg"
      }
      alt=""
      width={1080}
      height={1080}
    />
  );
}
