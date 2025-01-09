import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { addProject } from "@/app/store/slices/projectsSlice";
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

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  callBack: () => void;
}

const NewProject = ({ open, setOpen, callBack }: Props) => {
  const [newProjectDatas, setNewProjectDatas] = useState<any>({
    name: "",
    description: "",
    deadline: null,
  });

  const isDisabled = false;

  const dispatch = useAppDispatch();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateNewProject = async () => {
    // Get the CSRF token from the cookie
    const csrfToken = Cookies.get("XSRF-TOKEN"); // Get the CSRF token from the cookie

    const response = await fetch(`http://192.168.1.10:80/api/projects`, {
      method: "POST",
      //@ts-ignore
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 10|CXl2vSpF3TddiN4TOViSg9mvZbYFr2BZtUsci1wk91de8d4e",
        "X-XSRF-TOKEN": csrfToken, // Include the CSRF token in the headers
      },
      credentials: "include", // Include cookies in the request
      body: JSON.stringify(newProjectDatas),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const createdProject = await response.json();
    console.log("Project created successfully:", createdProject);
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
