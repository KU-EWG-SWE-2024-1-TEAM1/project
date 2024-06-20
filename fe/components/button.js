import React from "react";

const Button = ({ type = "button", children, onClick, disabled }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-primary border border-primary rounded-lg py-1 px-3 mt-4 transition duration-300 ease-in-out ${
        disabled ? "text-textInactive cursor-not-allowed" : "text-textActive"
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
