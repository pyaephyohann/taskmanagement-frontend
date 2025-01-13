"use client";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { appDatas } from "@/app/store/slices/appSlice";
import DatePicker from "@/components/DatePicker";
import { Box, Button, TextField, Typography } from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { deleteProject } from "@/app/store/slices/projectsSlice";
import { config } from "@/app/config";
import { useRouter } from "next/navigation";

interface Params {
  params: {
    id: string;
  };
}

const EditProject = ({ params }: Params) => {
  const { projects } = useAppSelector(appDatas);

  const { id } = params;

  const [projectToUpdate, setProjectToUpdate] = useState<any>();

  const [isLoading, setIsLoading] = useState(false);

  const currentProject = projects.find((project: any) => {
    return project.projects_id === Number(id);
  });

  const csrfToken = Cookies.get("XSRF-TOKEN");

  axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer 14|H8IkkoMPCOY97imhQtVfq2ldtRL0VOp9w7Vg05dP6934b0a2`;

  const handleEditProject = async () => {
    axios
      .put(`${config.apiBaseUrl}/projects/${id}`, projectToUpdate)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (!currentProject)
    return <div className="mt-[8rem] text-center text-3xl">Loading...</div>;

  return (
    <div>
      <h1 className="text-center text-3xl mt-[8rem]">EditProject</h1>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "4rem",
        }}
      >
        <TextField
          defaultValue={currentProject.name}
          sx={{ width: "20rem" }}
          onChange={(event) =>
            setProjectToUpdate({
              ...projectToUpdate,
              name: event.target.value,
            })
          }
          label="Name"
        />
        <TextField
          defaultValue={currentProject.description}
          multiline
          rows={4}
          sx={{ width: "20rem", marginTop: "1.3rem", marginBottom: "1.5rem" }}
          onChange={(event) =>
            setProjectToUpdate({
              ...projectToUpdate,
              description: event.target.value,
            })
          }
        />
        <DatePicker
          label="Deadline"
          defaultValue={dayjs(currentProject.deadline)}
          onChange={(value) => {
            setProjectToUpdate({ ...projectToUpdate, deadline: value });
          }}
        />
        <Button
          onClick={handleEditProject}
          disabled={isLoading}
          sx={{
            width: "20rem",
            marginTop: "1.3rem",
            bgcolor: "#A855F7",
          }}
          variant="contained"
        >
          Confirm
        </Button>
      </Box>
      <Box sx={{ marginTop: "5rem" }}>
        <h2 className="text-2xl text-center">Danger Zone</h2>
        <Box
          sx={{
            border: "0.1rem",
            borderColor: "#F93827",
            borderStyle: "solid",
            width: "50rem",
            padding: "1rem",
            marginX: "auto",
            marginTop: "1rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <h2 className="text-[1.2rem] mb-3">Delete This Project</h2>
              <Typography
                sx={{
                  opacity: 0.7,
                }}
              >
                Once you delete this project, there is no going back. Please be
                certain.
              </Typography>
            </Box>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#F93827",
                textTransform: "none",
              }}
            >
              Delete Project
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default EditProject;
