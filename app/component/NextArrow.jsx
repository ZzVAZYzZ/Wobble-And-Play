// File: NextArrow.js
import React from "react";

const NextArrow = (props) => {
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
          d="M233.252,155.997L120.752,6.001c-4.972-6.628-14.372-7.97-21-3c-6.628,4.971-7.971,14.373-3,21 l105.75,140.997L96.752,306.001c-4.971,6.627-3.627,16.03,3,21c2.698,2.024,5.856,3.001,8.988,3.001 c4.561,0,9.065-2.072,12.012-6.001l112.5-150.004C237.252,168.664,237.252,161.33,233.252,155.997z"
        />
      </svg>
    </div>
  );
};

export default NextArrow;
