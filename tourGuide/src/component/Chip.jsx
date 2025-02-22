import React from "react";

const Chip = ({ children, className = "" }) => {
  return (
    <span className={`bg-gray-200 px-3 py-1 rounded flex items-center ${className}`}>
      {children}
    </span>
  );
};

export default Chip;
