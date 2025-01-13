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
import SingleSelector from "./SingleSelector";
import { appDatas } from "@/app/store/slices/appSlice";
import { config } from "@/app/config";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  projectId: number;
}

const NewTask = ({ open, setOpen, projectId }: Props) => {
  const { users } = useAppSelector(appDatas);
  const [newTaskDatas, setNewTaskDatas] = useState<any>();

  console.log(newTaskDatas);

  const statusOptions = [
    {
      id: 1,
      name: "pending",
    },
    {
      id: 2,
      name: "in_progress",
    },
    {
      id: 3,
      name: "completed",
    },
  ];

  const priorityOptions = [
    {
      id: 1,
      name: "low",
    },
    {
      id: 2,
      name: "medium",
    },
    {
      id: 3,
      name: "high",
    },
  ];

  const userOptions = users.map((user: any) => {
    return { id: user.id, name: user.name };
  });

  const isDisabled = false;

  const dispatch = useAppDispatch();
  const [isCreating, setIsCreating] = useState(false);

  const csrfToken = Cookies.get("XSRF-TOKEN");

  axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer 2|OXLPwHIjbYsyVqa8ALu9a9MNrxB8zpRSk9CqdjhDd4579719`;

  const handleCreateNewTask = async () => {
    axios
      .post(`${config.apiBaseUrl}/projects/${projectId}/tasks`, newTaskDatas)
      .then((response) => {
        setOpen(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle sx={{ textAlign: "center", marginTop: "2rem" }}>
        Create New Task
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
              setNewTaskDatas({
                ...newTaskDatas,
                title: event.target.value,
              })
            }
            label="Title"
          />
          <TextField
            sx={{ width: "20rem", marginY: "1rem" }}
            onChange={(event) =>
              setNewTaskDatas({
                ...newTaskDatas,
                description: event.target.value,
              })
            }
            label="Description"
          />
          <Box
            sx={{
              "& > * + *": {
                marginTop: "1rem", // Adds 1rem margin to the top of each child except the first one
              },
            }}
          >
            <SingleSelector
              options={statusOptions}
              label="Status"
              onChange={(statusId) => {
                const status = statusOptions.find(
                  (item) => item.id === statusId
                );
                setNewTaskDatas({ ...newTaskDatas, status: status?.name });
              }}
              width="10rem"
            />
            <SingleSelector
              options={priorityOptions}
              label="Priority"
              onChange={(priorityId) => {
                const priority = priorityOptions.find(
                  (item) => item.id === priorityId
                );
                setNewTaskDatas({ ...newTaskDatas, priority: priority?.name });
              }}
              width="10rem"
            />
            <SingleSelector
              options={userOptions}
              label="Assign To"
              onChange={(userId) => {
                setNewTaskDatas({ ...newTaskDatas, assign_to: userId });
              }}
              width="10rem"
            />
            <DatePicker
              label="Due Date"
              onChange={(value) =>
                setNewTaskDatas({ ...newTaskDatas, due_date: value })
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
          onClick={handleCreateNewTask}
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

export default NewTask;
