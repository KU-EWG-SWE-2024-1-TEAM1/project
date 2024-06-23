"use client";
import Button from "@/components/button";
import InputForm from "@/components/inputForm";
import Logo from "@/components/logo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {loginApi} from "@/app/api/login/api";
import {login} from "@/store/slices/loginSlice";
import {useDispatch} from "react-redux";

const LogIn = () => {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isNull, setIsNull] = useState(true);

  const handleChange = (e) => {
    setIsNull(!inputs.email || !inputs.password)
    const { name, value } = e.target;
    const newInputs = { ...inputs };
    newInputs[name] = value;
    setInputs(newInputs);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailFormat.test(inputs.email)) {
      setErrorMessage("이메일 형식이 올바르지 않습니다.");
      return;
    }
    if (inputs.password.length < 8) {
      setErrorMessage("비밀번호는 8글자 이상이어야 합니다.");
      return;
    }
    setErrorMessage("");
    setLoading(true);
    try {
      const result = await loginApi(inputs.email, inputs.password);
      dispatch(login({ email: inputs.email, token: result.token }));
      router.back();
    } catch (error) {
      setErrorMessage('로그인 실패: ' + error.message);
    } finally {
      setLoading(false);
    }

  };

  return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg w-[350px]">
          <Logo width={200} height={76} />
          <form onSubmit={handleLogin} className="flex flex-col justify-center">
            <InputForm
                label="EMAIL"
                type="email"
                name="email"
                placeholder="Welcome@MovieMovit.com"
                value={inputs.email}
                onChange={handleChange}
            />
            <InputForm
                label="PASSWORD"
                type="password"
                name="password"
                placeholder="8글자 이상 입력해야 합니다."
                value={inputs.password}
                onChange={handleChange}
            />
            {errorMessage && (
                <span className="flex justify-center text-sm text-red-500">
              {errorMessage}
            </span>
            )}
            <Button type="submit" disabled={isNull||loading}>
              LOGIN
            </Button>
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
