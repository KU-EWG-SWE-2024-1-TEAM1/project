"use client";

import Button from "@/components/button";
import InputForm from "@/components/inputForm";
import React, { useState } from "react";

const LogIn = () => {
  const [inputs, setInputs] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newInputs = { ...inputs };
    newInputs[name] = value;
    setInputs(newInputs);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(inputs);
  };

  return (
    <>
      {/* <header>Login</header> */}
      <form>
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
        <Button type="submit" onClick={handleLogin}>
          LOG IN
        </Button>
      </form>
    </>
  );
};

export default LogIn;
