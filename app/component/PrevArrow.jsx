// File: PrevArrow.js
import React from "react";

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        position: "relative",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <svg
        fill="#000000"
        height="50px"
        width="50px"
        viewBox="0 0 330.002 330.002"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M233.25,306.001L127.5,165.005L233.25,24.001c4.971-6.628,3.627-16.03-3-21c-6.627-4.971-16.03-3.626-21,3 L96.75,156.005c-4,5.333-4,12.667,0,18l112.5,149.996c2.947,3.93,7.451,6.001,12.012,6.001c3.131,0,6.29-0.978,8.988-3.001 C236.878,322.03,238.221,312.628,233.25,306.001z"
        />
      </svg>
    </div>
  );
};

export default PrevArrow;
