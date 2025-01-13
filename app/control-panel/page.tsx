"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { appDatas } from "../store/slices/appSlice";
import { useRouter } from "next/navigation";
import ProjectCard from "@/components/ProjectCard";
import { Box, Button, Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NewProject from "@/components/NewProject";
import dayjs from "dayjs";
import { addProject, deleteProject } from "../store/slices/projectsSlice";
import DeleteDialog from "@/components/DeleteDialog";
import Cookies from "js-cookie";
import axios from "axios";
import { config } from "../config";

const ControlPanel = () => {
  const { projects } = useAppSelector(appDatas);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [projectIdToDelete, setProjectIdToDelete] = useState(null);

  const csrfToken = Cookies.get("XSRF-TOKEN");

  axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer 14|H8IkkoMPCOY97imhQtVfq2ldtRL0VOp9w7Vg05dP6934b0a2`;

  const handleDeleteProject = async () => {
    await axios
      .delete(`${config.apiBaseUrl}/projects/${projectIdToDelete}`)
      .then((response) => {
        dispatch(deleteProject(response.data.data));
        alert("hehe");
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
                  router.push(
                    `/control-panel/tasks?projectId=${project.projects_id}`
                  );
                }}
                className="m-[0.8rem]"
                key={project.id}
              >
                <ProjectCard
                  createdAt={dayjs(project.created_at).format("DD MMM YYYY")}
                  name={project.name}
                  description={project.description}
                  deadline={project.deadline}
                  createdBy={project.user_name}
                />
                <div className="mt-[0.5rem] flex justify-between px-[1rem]">
                  <Chip
                    onClick={() => {
                      setProjectIdToDelete(project.projects_id);
                      setOpenDeleteDialog(true);
                    }}
                    label="Delete"
                    clickable
                    sx={{
                      bgcolor: "#F93827",
                      color: "white",
                    }}
                  />
                  <Chip
                    onClick={() => {
                      router.push(
                        `/control-panel/project/${project.projects_id}`
                      );
                    }}
                    label="Edit"
                    sx={{
                      bgcolor: "#A855F7",
                      color: "white",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <NewProject open={open} setOpen={setOpen} />
      <DeleteDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        title="Delete Project"
        callBack={handleDeleteProject}
      />
    </div>
  );
};

export default ControlPanel;
