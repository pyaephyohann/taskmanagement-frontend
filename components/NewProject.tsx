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

  const fetchCsrfToken = async () => {
    try {
      // Call the Sanctum endpoint to set the CSRF token cookie
      const response = await fetch(
        "http://192.168.1.10:80/sanctum/csrf-cookie",
        {
          credentials: "include", // Include cookies in the request
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch CSRF token");
      }

      const csrfToken = Cookies.get("XSRF-TOKEN");

      console.log(csrfToken);

      if (!csrfToken) {
        throw new Error("CSRF token not found in cookies");
      }

      console.log("CSRF token fetched successfully:", csrfToken);
      return csrfToken; // Return the CSRF token
    } catch (error) {
      console.error("Error fetching CSRF token:", error);
      throw error; // Re-throw the error to handle it in the calling function
    }
  };

  const handleCreateNewProject = async () => {
    try {
      // Fetch the CSRF token
      const csrfToken = await fetchCsrfToken();

      // Use the CSRF token in your API request
      const response = await fetch(`http://192.168.1.10:80/api/projects`, {
        method: "POST",
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
    } catch (error) {
      console.error("Error creating project:", error);
      alert("An error occurred. Please try again.");
    }
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
