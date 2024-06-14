import React from "react";

const Button = ({ type = "button", children, onClick }) => {
  return (
    <button type={type} onClick={onClick} className="">
      {children}
    </button>
  );
};

export default Button;
