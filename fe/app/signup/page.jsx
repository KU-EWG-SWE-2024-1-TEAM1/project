"use client";

import Button from "@/components/button";
import InputForm from "@/components/inputForm";
import Logo from "@/components/logo";
import Link from "next/link";
import React, { useState } from "react";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    email: "",
    nickName: "",
    password: "",
    confirmPassword: "",
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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[350px]">
        {/* <header>Sign Up</header> */}
        <Logo width={200} height={76} />
        <form onSubmit={handleSignUp} className="flex flex-col justify-center">
          <InputForm
            label="NAME"
            type="text"
            name="fullName"
            placeholder="fullname"
            value={inputs.fullName}
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
            label="NICKNAME"
            type="text"
            name="nickName"
            placeholder="nickname"
            value={inputs.nickName}
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
          <InputForm
            label="CONFIRM PASSWORD"
            type="password"
            name="confirmPassword"
            placeholder="●●●●●●●●"
            value={inputs.confirmPassword}
            onChange={handleChange}
          />
          <Button type="submit">SIGN UP</Button>
        </form>

        <Link
          href={"/login"}
          className="block w-full mt-4 text-center text-sm border border-primary hover:bg-primary hover:text-textActive rounded-lg py-1 px-3 transition duration-300 ease-in-out"
        >
          LOGIN
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
