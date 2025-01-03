"use client";

import Button from "@/components/Button";
import React from "react";

const SignIn = () => {
  return (
    <div className="mt-[5rem]">
      <h1 className="text-center text-4xl fonf-boldMd">
        Log In To Your Account
      </h1>
      <div className="flex flex-col w-[30%] space-y-[1rem] mx-auto mt-[3rem]">
        <input
          className="pl-[1rem] bg-purple-200 rounded-[1.5rem] py-[0.8rem] outline-purple-500"
          type="email"
          placeholder="Enter Email"
        />
        <input
          className="pl-[1rem] bg-purple-200 rounded-[1.5rem] py-[0.8rem] outline-purple-500"
          type="password"
          placeholder="Enter Password"
        />
        <Button
          style="py-[0.8rem] rounded-[1.5rem]"
          onClick={() => {}}
          label="Log In"
        />
      </div>
    </div>
  );
};

export default SignIn;
