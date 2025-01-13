"use client";

import ProjectCard from "@/components/ProjectCard";
import { projectDatas } from "@/utils/datas";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { config } from "./config";

const App = () => {
  const router = useRouter();
  console.log(config.apiBaseUrl);
  // const [projects, setProjects] = useState<any>([]);

  // const [isLoading, setIsLoading] = useState(false);

  // const handleGetProjects = async () => {
  //   setIsLoading(true);
  //   const response = await fetch("http://192.168.1.15:80/api/projects", {
  //     headers: {
  //       Authorization:
  //         "Bearer 2|MkMuPAZVQUYNLMNekWru9A6GKXWdaFyQT9MMeum557fdaa87",
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const responseJson = await response.json();
  //   setProjects(responseJson.data);
  //   setIsLoading(false);
  // };

  // useEffect(() => {
  //   handleGetProjects();
  // }, []);

  // if (isLoading)
  //   return <p className="text-center text-2xl mt-[8rem]">Loading...</p>;

  return (
    <div className="mb-[1.5rem]">
      <h1 className="text-3xl text-center my-[1.5rem] text-purple-500">
        Projects
      </h1>
      <div className="flex justify-center items-center">
        <div className="flex items-center flex-wrap px-[1rem] w-fit">
          {projectDatas.map((project: any) => {
            return (
              <div
                onClick={() => {
                  router.push(`/tasks?projectId=${project.id}`);
                }}
                className="m-[0.5rem]"
                key={project.id}
              >
                <ProjectCard
                  createdAt={project.created_at}
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
