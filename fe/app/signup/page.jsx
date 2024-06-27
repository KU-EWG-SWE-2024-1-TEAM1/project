"use client";

import Button from "@/components/button";
import InputForm from "@/components/inputForm";
import Logo from "@/components/logo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {signupApi} from "@/app/api/signup/api";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    nickname: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newInputs = { ...inputs };
    newInputs[name] = value;
    setInputs(newInputs);
  };

  const validateForm = () => {
    if (inputs.name < 2) {
      setErrorMessage("이름은 2글자 이상이어야 합니다.");
      return false;
    }
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailFormat.test(inputs.email)) {
      setErrorMessage("이메일 형식이 올바르지 않습니다.");
      return false;
    }
    if (inputs.nickname < 2) {
      setErrorMessage("닉네임은 2글자 이상이어야 합니다.");
      return false;
    }
    if (inputs.password < 8) {
      setErrorMessage("비밀번호는 8글자 이상이어야 합니다.");
      return false;
    }
    if (inputs.password !== inputs.confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    try {
      const result = await signupApi(inputs);
      router.push("/login");
    } catch (error) {
      setErrorMessage('회원가입 실패: ' + error.message);
    }
  };

  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 bg-cover bg-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-[350px]  transition duration-300 ease-in-out border-4 border-gray-950 hover:border-gray-400">
          <div className="flex justify-center mb-4">
            <Logo width={200} height={76} />
          </div>
          <form onSubmit={handleSignUp} className="flex flex-col space-y-4">
            <InputForm
                label="NAME"
                type="text"
                name="name"
                placeholder="성함을 입력해주세요"
                value={inputs.name}
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
                name="nickname"
                placeholder="닉네임을 입력해주세요"
                value={inputs.nickname}
                onChange={handleChange}
            />
            <InputForm
                label="PASSWORD"
                type="password"
                name="password"
                placeholder="비밀번호는 8글자 이상이어야 합니다."
                value={inputs.password}
                onChange={handleChange}
            />
            <InputForm
                label="CONFIRM PASSWORD"
                type="password"
                name="confirmPassword"
                placeholder="비밀번호와 일치해야 합니다."
                value={inputs.confirmPassword}
                onChange={handleChange}
            />
            {errorMessage && (
                <span className="text-center text-sm text-red-500">
                            {errorMessage}
                        </span>
            )}
            <Button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              SIGN UP
            </Button>
          </form>
          <Link
              href={"/login"}
              className="block w-full mt-4 text-center text-sm border border-primary text-primary rounded-lg py-1 px-3 hover:bg-primary hover:text-white transition duration-300 ease-in-out"
          >
            LOGIN
          </Link>
        </div>
      </div>
  );
};

export default SignUp;
