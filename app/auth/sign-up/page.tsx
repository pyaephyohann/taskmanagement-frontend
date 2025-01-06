"use client";

import Button from "@/components/Button";
import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const SignUp = () => {
  const [signUpDatas, setSignUpDatas] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignUp = async () => {
    console.log(signUpDatas);
    const response = await fetch("http://192.168.1.12:80/api/register", {
      method: "POST",
      body: JSON.stringify(signUpDatas),
    });
    const responseJson = await response.json();
    console.log(responseJson);
  };

  return (
    <div className="mt-[5rem]">
      <h1 className="text-center text-4xl fonf-boldMd">Create Account</h1>
      <div className="flex flex-col w-[30%] space-y-[1rem] mx-auto mt-[3rem]">
        <input
          onChange={(event) =>
            setSignUpDatas({ ...signUpDatas, name: event.target.value })
          }
          className="pl-[1rem] bg-purple-200 rounded-[1.5rem] py-[0.8rem] outline-purple-500"
          type="text"
          placeholder="Enter Your Name"
        />
        <input
          onChange={(event) =>
            setSignUpDatas({ ...signUpDatas, email: event.target.value })
          }
          className="pl-[1rem] bg-purple-200 rounded-[1.5rem] py-[0.8rem] outline-purple-500"
          type="email"
          placeholder="Enter Email"
        />
        <input
          onChange={(event) =>
            setSignUpDatas({ ...signUpDatas, password: event.target.value })
          }
          className="pl-[1rem] bg-purple-200 rounded-[1.5rem] py-[0.8rem] outline-purple-500"
          type="password"
          placeholder="Enter Password"
        />
        <Button
          style="py-[0.8rem] rounded-[1.5rem]"
          onClick={handleSignUp}
          label="Create Account"
        />
      </div>
    </div>
  );
};

export default SignUp;
