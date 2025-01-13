"use client";

import ProjectCard from "@/components/ProjectCard";
import { projectDatas } from "@/utils/datas";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { config } from "./config";
import { useAppSelector } from "./store/hooks";
import { appDatas } from "./store/slices/appSlice";
import dayjs from "dayjs";

const App = () => {
  const router = useRouter();

  const { projects } = useAppSelector(appDatas);

  return (
    <div className="mb-[1.5rem]">
      <h1 className="text-3xl text-center my-[1.5rem] text-purple-500">
        Projects
      </h1>
      <div className="flex justify-center items-center">
        <div className="flex items-center flex-wrap px-[1rem] w-fit">
          {projects.map((project: any) => {
            return (
              <div
                onClick={() => {
                  router.push(`/tasks?projectId=${project.projects_id}`);
                }}
                className="m-[0.5rem]"
                key={project.id}
              >
                <ProjectCard
                  createdAt={dayjs(project.created_at).format("DD MMM YYYY")}
                  name={project.name}
                  description={project.description}
                  deadline={project.deadline}
                  createdBy={project.user_name}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
