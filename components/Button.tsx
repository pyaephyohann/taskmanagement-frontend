"use client";
import React from "react";

interface Props {
  label: string;
  onClick: () => void;
  style?: string;
}

const Button = ({ onClick, label, style }: Props) => {
  return (
    <button
      className={`text-white py-[0.5rem] px-[1rem] rounded-md bg-purple-500 ${style}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
