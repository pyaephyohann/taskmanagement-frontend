import ProjectCard from "@/components/ProjectCard";
import { projectDatas } from "@/utils/datas";
import React from "react";

const App = () => {
  return (
    <div className="mb-[1.5rem]">
      <h1 className="text-3xl text-center my-[1.5rem] text-purple-500">
        Projects
      </h1>
      <div className="flex justify-center items-center">
        <div className="flex items-center flex-wrap px-[1rem] w-fit">
          {projectDatas.map((item) => {
            return (
              <div className="m-[0.5rem]" key={item.id}>
                <ProjectCard
                  createdAt="Jan 2, 2025"
                  name="Animate Illustration"
                  description="Animated drawings are a fascinating blend of art and storytelling that brings illustrations to life"
                  deadline="3 days left"
                  createdBy="Pyae Phyo Han"
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
