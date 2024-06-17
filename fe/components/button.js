import React from "react";

const Button = ({ type = "button", children, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-primary text-textInactive border border-primary hover:text-textActive rounded-lg py-1 px-3 mt-4 transition duration-300 ease-in-out"
    >
      {children}
    </button>
  );
};

export default Button;
