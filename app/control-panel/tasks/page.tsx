"use client";

import {
  Box,
  Button,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { tasks } from "@/utils/datas";
import { useAppSelector } from "@/app/store/hooks";
import { appDatas } from "@/app/store/slices/appSlice";
import DatePicker from "@/components/DatePicker";
import dayjs from "dayjs";
import SingleSelector from "@/components/SingleSelector";
import Cookies from "js-cookie";
import axios from "axios";
import { config } from "@/app/config";
import AddIcon from "@mui/icons-material/Add";
import NewTask from "@/components/NewTask";
import DeleteDialog from "@/components/DeleteDialog";

interface Props {
  searchParams: {
    projectId: string;
  };
}

const Tasks = ({ searchParams }: Props) => {
  const { tasks, users } = useAppSelector(appDatas);

  const [openNewTaskDialog, setOpenNewTaskDialog] = useState(false);

  const [taskIdToDelete, setTaskIdToDelete] = useState<any>(null);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const { projectId } = searchParams;

  const csrfToken = Cookies.get("XSRF-TOKEN");

  axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer 14|H8IkkoMPCOY97imhQtVfq2ldtRL0VOp9w7Vg05dP6934b0a2`;

  const handleEditTask = async () => {
    axios
      .put(
        `${config.apiBaseUrl}/projects/${projectId}/tasks/${taskToUpdate.id}`,
        taskToUpdate
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteTask = async () => {
    axios
      .delete(
        `${config.apiBaseUrl}/projects/${projectId}/tasks/${taskIdToDelete}`
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
      name: "complete",
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

  const [taskToUpdate, setTaskToUpdate] = useState<any>({});

  const tasksByProjectId = tasks.filter((item: any) => {
    return item.project_id === Number(projectId);
  });

  const Task = ({ task }: any) => {
    const [open, setOpen] = useState(false);

    const statusDefaultValue = statusOptions.find((item) => {
      return item.name === task.status;
    });

    const priorityDefaultValue = priorityOptions.find((item) => {
      return item.name === task.priority;
    });

    const userDefaultValue = userOptions.find((user: any) => {
      return user.id === task.assign_to;
    });

    const RenderTaskDetails = () => {
      return (
        <div className="my-[0.8rem]">
          <h2 className="text-xl font-bold mb-[1.5rem]">Description</h2>
          <TextField
            multiline
            rows={4}
            defaultValue={task.description}
            onChange={(event) =>
              setTaskToUpdate({
                ...taskToUpdate,
                description: event.target.value,
              })
            }
            label="Name"
          />
          <div className="space-x-[0.5rem] mt-[0.8rem]">
            <Button
              onClick={() => {
                setOpenDeleteDialog(true);
                setTaskIdToDelete(task.id);
              }}
              variant="contained"
              color="error"
            >
              Delete
            </Button>
          </div>
        </div>
      );
    };

    return (
      <>
        <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
          <TableCell align="center">
            <IconButton onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell align="center" component="th" scope="row">
            <TextField
              defaultValue={taskToUpdate.name ? taskToUpdate.name : task.title}
              onChange={(event) =>
                setTaskToUpdate({
                  ...taskToUpdate,
                  title: event.target.value,
                  id: task.id,
                })
              }
              label="Name"
            />
          </TableCell>
          <TableCell align="center">
            <SingleSelector
              options={statusOptions}
              defaultValue={statusDefaultValue}
              label="Status"
              onChange={(statusId) => {
                const status = statusOptions.find(
                  (item) => item.id === statusId
                );
                setTaskToUpdate({
                  ...taskToUpdate,
                  status: status?.name,
                  id: task.id,
                });
              }}
              width="10rem"
            />
          </TableCell>
          <TableCell align="center">
            <SingleSelector
              options={priorityOptions}
              defaultValue={priorityDefaultValue}
              label="Priority"
              onChange={(priorityId) => {
                const priority = priorityOptions.find(
                  (item) => item.id === priorityId
                );
                setTaskToUpdate({
                  ...taskToUpdate,
                  prority: priority?.name,
                  id: task.id,
                });
              }}
              width="10rem"
            />
          </TableCell>
          <TableCell align="center">
            <SingleSelector
              options={userOptions}
              defaultValue={userDefaultValue}
              label="Assigned To"
              onChange={(userId) => {
                setTaskToUpdate({
                  ...taskToUpdate,
                  assign_to: userId,
                  id: task.id,
                });
              }}
              width="10rem"
            />
          </TableCell>
          <TableCell align="center">
            <DatePicker
              label="Due Date"
              width="5rem"
              defaultValue={dayjs(task.due_date)}
              onChange={(value) =>
                setTaskToUpdate({
                  ...taskToUpdate,
                  due_date: value,
                  id: task.id,
                })
              }
            />
          </TableCell>
          <TableCell align="center">
            <Button
              onClick={handleEditTask}
              sx={{
                bgcolor: "#A855F7",
              }}
              variant="contained"
            >
              Edit
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: "0", paddingTop: "0" }}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              {<RenderTaskDetails />}
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  };

  return (
    <div>
      <h1 className="text-3xl text-center my-[1.5rem] text-purple-500">
        Project Name
      </h1>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "1rem",
          marginRight: "2rem",
        }}
      >
        <Button
          onClick={() => setOpenNewTaskDialog(true)}
          sx={{ bgcolor: "#A855F7" }}
          variant="contained"
          startIcon={<AddIcon />}
        >
          New Task
        </Button>
      </Box>
      <Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" />
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Priority</TableCell>
                <TableCell align="center">Assigned To</TableCell>
                <TableCell align="center">Due Date</TableCell>
                <TableCell align="center" />
              </TableRow>
            </TableHead>
            <TableBody>
              {tasksByProjectId.map((task: any) => (
                <Task task={task} key={task.id} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <NewTask
          open={openNewTaskDialog}
          setOpen={setOpenNewTaskDialog}
          projectId={Number(projectId)}
        />
        <DeleteDialog
          title="Delete Task"
          open={openDeleteDialog}
          setOpen={setOpenDeleteDialog}
          callBack={handleDeleteTask}
        />
      </Box>
    </div>
  );
};

export default Tasks;
