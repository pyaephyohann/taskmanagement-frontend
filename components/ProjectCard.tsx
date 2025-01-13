import dayjs from "dayjs";
import React from "react";
import { BsTicketDetailed } from "react-icons/bs";

interface Props {
  createdAt: string;
  name: string;
  description: string;
  deadline: string;
  createdBy: string;
}

const ProjectCard = ({
  createdAt,
  name,
  description,
  deadline,
  createdBy,
}: Props) => {
  return (
    <div className="bg-[#EFF3EA] cursor-pointer w-[25rem] p-[1rem] rounded-[0.5rem]">
      <h2 className="opacity-50 text-[0.8rem]">{createdAt}</h2>
      <div className="mt-[0.5rem]">
        <h1 className="text-2xl text-purple-500">{name}</h1>
        <p className="opacity-70 text-[0.9rem] mt-[0.5rem]">{description}</p>
      </div>
      <div className="h-[0.1rem] my-[1rem] bg-gray-300"></div>
      <div className="flex justify-between items-center">
        <div className="flex space-x-[0.5rem]">
          <p className="text-purple-500">Project By</p>
          <p className="rounded-2xl bg-purple-500 text-[0.8rem] text-white p-[0.3rem] px-[0.8rem]">
            {createdBy}
          </p>
        </div>
        <h4 className="rounded-2xl bg-purple-500 text-[0.8rem] text-white p-[0.3rem] px-[0.8rem]">
          {dayjs(deadline).format("YYYY-MM-DD")}
        </h4>
      </div>
    </div>
  );
};

export default ProjectCard;
