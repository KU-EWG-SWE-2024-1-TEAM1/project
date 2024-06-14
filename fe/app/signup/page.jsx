"use client";

import Button from "@/components/button";
import InputForm from "@/components/inputForm";
import React, { useState } from "react";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    nickName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newInputs = { ...inputs };
    newInputs[name] = value;
    setInputs(newInputs);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log(inputs);
  };

  return (
    <>
      {/* <header>Sign Up</header> */}
      <form>
        <InputForm
          label="NAME"
          type="text"
          name="fullName"
          placeholder="fullname"
          value={inputs.fullName}
          onChange={handleChange}
        />
        <InputForm
          label="NICKNAME"
          type="text"
          name="nickName"
          placeholder="nickname"
          value={inputs.nickName}
          onChange={handleChange}
        />
        <InputForm
          label="EMAIL"
          type="email"
          name="email"
          placeholder="moving@movie.com"
          value={inputs.email}
          onChange={handleChange}
        />
        <InputForm
          label="PASSWORD"
          type="password"
          name="password"
          placeholder="●●●●●●●●"
          value={inputs.password}
          onChange={handleChange}
        />
        <Button type="submit" onClick={handleSignUp}>
          SIGN UP
        </Button>
      </form>
    </>
  );
};

export default SignUp;
