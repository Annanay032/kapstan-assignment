import React from "react";
export const DotIcon = (props) => (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="4" cy="4" r="4" fill={props?.color || "#00B88C"} />
  </svg>
);
