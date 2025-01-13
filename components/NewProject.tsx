import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { addProject } from "@/app/store/slices/projectsSlice";
import axios from "axios";
import Cookies from "js-cookie";
import dayjs from "dayjs";

import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import DatePicker from "./DatePicker";
import { appDatas } from "@/app/store/slices/appSlice";
import { config } from "@/app/config";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const NewProject = ({ open, setOpen }: Props) => {
  const [newProjectDatas, setNewProjectDatas] = useState<any>({
    name: "",
    description: "",
    deadline: null,
  });

  const isDisabled = false;

  const dispatch = useAppDispatch();
  const [isCreating, setIsCreating] = useState(false);

  const csrfToken = Cookies.get("XSRF-TOKEN");

  axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer 2|OXLPwHIjbYsyVqa8ALu9a9MNrxB8zpRSk9CqdjhDd4579719`;

  const handleCreateNewProject = async () => {
    axios
      .post(`${config.apiBaseUrl}/projects`, newProjectDatas)
      .then((response) => {
        const createdProject = {
          ...response.data.data,
          projects_id: response.data.data.id,
          id: undefined,
        };

        delete response.data.data.id;
        dispatch(addProject(createdProject));
        setOpen(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle sx={{ textAlign: "center", marginTop: "2rem" }}>
        Create New Project
      </DialogTitle>
      <DialogContent sx={{ mt: "0.5rem", paddingX: "6rem" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TextField
            sx={{ width: "20rem" }}
            onChange={(event) =>
              setNewProjectDatas({
                ...newProjectDatas,
                name: event.target.value,
              })
            }
            label="Name"
          />
          <TextField
            sx={{ width: "20rem", marginY: "1rem" }}
            onChange={(event) =>
              setNewProjectDatas({
                ...newProjectDatas,
                description: event.target.value,
              })
            }
            label="Description"
          />
          <Box sx={{ marginBottom: "1rem" }}>
            <DatePicker
              label="Deadline"
              onChange={(value) =>
                setNewProjectDatas({
                  ...newProjectDatas,
                  deadline: value,
                })
              }
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{ mb: "2rem", display: "flex", justifyContent: "center" }}
      >
        <Button
          sx={{ bgcolor: "#A855F7" }}
          onClick={handleCreateNewProject}
          disabled={isDisabled}
          variant="contained"
        >
          {isCreating ? (
            <CircularProgress sx={{ color: "#fff" }} size="2rem" />
          ) : (
            "Create"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewProject;
