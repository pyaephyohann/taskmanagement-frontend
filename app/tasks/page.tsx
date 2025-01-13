"use client";

import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useAppSelector } from "../store/hooks";
import { appDatas } from "../store/slices/appSlice";
import SingleSelector from "@/components/SingleSelector";
import axios from "axios";
import { config } from "../config";
import Cookies from "js-cookie";

interface Props {
  searchParams: {
    projectId: string;
  };
}

const Tasks = ({ searchParams }: Props) => {
  const { projectId } = searchParams;
  const { tasks, users } = useAppSelector(appDatas);

  const [selectedStatus, setSelectedStatus] = useState<any>(null);

  const tasksByProjectId = tasks.filter((item: any) => {
    return item.project_id === Number(projectId);
  });

  const csrfToken = Cookies.get("XSRF-TOKEN");

  axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer 5|S6uB8oi4m6FDz5EF0jWkspT8mxBxK87YmEwcMrKnc0c5b441`;

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

  const Task = ({ task }: any) => {
    const [open, setOpen] = useState(false);

    const assignedUser = users.find((item: any) => item.id === task.assign_to);

    const statusDefaultValue = statusOptions.find((item) => {
      return item.name === task.status;
    });

    const handleUpdateTaskStatus = async (statusId: number) => {
      const status = statusOptions.find((item) => item.id === statusId);
      setSelectedStatus(status?.name);

      axios
        .patch(
          `${config.apiBaseUrl}/projects/${projectId}/tasks/${task.id}/2`,
          {
            status: status?.name,
          }
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const RenderTaskDetails = () => {
      return (
        <div className="my-[0.8rem]">
          <h2 className="text-xl font-bold mb-[0.5rem]">Description</h2>
          <p className="opacity-80">{task.description}</p>
          <div className="space-x-[0.5rem] mt-[0.8rem]">
            <span>Created By</span>
            <span className="font-bold">{task.created_by}</span>
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
            {task.title}
          </TableCell>
          <TableCell align="center">
            <SingleSelector
              options={statusOptions}
              defaultValue={statusDefaultValue}
              label="Status"
              onChange={(statusId) => {
                handleUpdateTaskStatus(statusId);
              }}
              width="2rem"
            />
          </TableCell>
          <TableCell align="center">{task.priority}</TableCell>
          <TableCell align="center">{assignedUser.name}</TableCell>
          <TableCell align="center">{task.due_date}</TableCell>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {tasksByProjectId.map((task: any) => (
                <Task task={task} key={task.id} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default Tasks;
