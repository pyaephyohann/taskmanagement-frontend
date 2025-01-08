"use client";

import React, { useState } from "react";
import { useAppSelector } from "../store/hooks";
import { appDatas } from "../store/slices/appSlice";
import { useRouter } from "next/navigation";
import ProjectCard from "@/components/ProjectCard";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NewProject from "@/components/NewProject";

const ControlPanel = () => {
  const { projects } = useAppSelector(appDatas);
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-[1.5rem] px-[3rem]">
      <h1 className="text-3xl text-center my-[1.5rem] text-purple-500">
        Projects
      </h1>
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}
      >
        <Button
          onClick={() => setOpen(true)}
          sx={{ bgcolor: "#A855F7" }}
          variant="contained"
          startIcon={<AddIcon />}
        >
          New Project
        </Button>
      </Box>
      <div className="flex justify-center items-center my-[2.5rem]">
        <div className="flex items-center flex-wrap px-[1rem] w-fit">
          {projects.map((project: any) => {
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
      <NewProject open={open} setOpen={setOpen} callBack={() => {}} />
    </div>
  );
};

export default ControlPanel;
