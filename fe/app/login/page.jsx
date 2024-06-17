"use client";

import Button from "@/components/button";
import InputForm from "@/components/inputForm";
import Logo from "@/components/logo";
import Link from "next/link";
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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[350px]">
        {/* <header>LogIn</header> */}
        <Logo width={200} height={76} />
        <form onSubmit={handleLogin} className="flex flex-col justify-center">
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
          <Button type="submit">LOGIN</Button>
        </form>

        <Link
          href={"/signup"}
          className="block w-full mt-4 text-center text-sm border border-primary hover:bg-primary hover:text-textActive rounded-lg py-1 px-3 transition duration-300 ease-in-out"
        >
          SIGN UP
        </Link>
      </div>
    </div>
  );
};

export default LogIn;
