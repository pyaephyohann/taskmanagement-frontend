"use client";

import Button from "@/components/Button";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { config } from "@/config";

const SignIn = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = async () => {
    if (!user.email || !user.password) {
      alert("Please fill in both fields!");
      return;
    }

    // Get the CSRF token from the cookie
    const csrfToken = Cookies.get("XSRF-TOKEN");

    try {
      const response = await fetch(`http://192.168.1.10:80/api/login`, {
        method: "POST",
        //@ts-ignore
        headers: {
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": csrfToken, // Include the CSRF token in the headers
        },
        body: JSON.stringify(user),
      });

      const responseJson = await response.json();
      console.log(responseJson);

      // Handle success (e.g., redirect or show a success message)
      if (response.ok) {
        alert("Login successful!");
        // Redirect or perform other actions
      } else {
        alert("Failed to log in. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="mt-[5rem]">
      <h1 className="text-center text-4xl font-bold">Log In To Your Account</h1>
      <div className="flex flex-col w-[30%] space-y-[1rem] mx-auto mt-[3rem]">
        <input
          onChange={(event) => setUser({ ...user, email: event.target.value })}
          className="pl-[1rem] bg-purple-200 rounded-[1.5rem] py-[0.8rem] outline-purple-500"
          type="email"
          placeholder="Enter Email"
        />
        <input
          onChange={(event) =>
            setUser({ ...user, password: event.target.value })
          }
          className="pl-[1rem] bg-purple-200 rounded-[1.5rem] py-[0.8rem] outline-purple-500"
          type="text" // Changed to type="password" for security
          placeholder="Enter Password"
        />
        <Button
          style="py-[0.8rem] rounded-[1.5rem]"
          onClick={handleSignIn}
          label="Log In"
        />
      </div>
    </div>
  );
};

export default SignIn;
