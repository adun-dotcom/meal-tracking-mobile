import React, { useState } from "react";
const CustomSpinner = ({
  size,
  thickness,
  background,
  spinColor,
  text,
  textSize,
  textColor,
  speed,
  style,
}) => {
  return (
    <div className="custom-spinner" style={style}>
      <div
        className="spinner"
        style={{
          height: size || "7rem",
          width: size || "7rem",
          border: `${thickness || "1rem" || "1rem"} solid ${
            background || "grey"
          } `,
          borderTop: `${thickness || "1rem"} solid ${spinColor || "#FF8303)"} `,
          borderRight: `${thickness || "1rem"} solid ${
            spinColor || "#FF8303)"
          } `,

          background: "transparent",
          animation: `spin ${speed || "1.5s"} linear infinite`,
        }}
      ></div>
      <span style={{ fontSize: textSize, color: textColor }}>{text}</span>
    </div>
  );
};

const BusyOverlay = ({ loading, text, speed }) => {
  const [isBusy, setIsBusy] = useState(false);

  return (
    <div className={loading || isBusy ? "busy-overlay-show" : "busy-overlay"}>
      <CustomSpinner
        text={text}
        textSize="1.5rem"
        textColor="#FF8303"
        size="4rem"
        thickness=".6rem"
        background="#e6e3df"
        spinColor="#FF8303"
        speed={speed || ".8s"}
      />
    </div>
  );
};

export default BusyOverlay;
