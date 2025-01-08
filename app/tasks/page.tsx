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
import { tasks } from "@/utils/datas";

interface Props {
  searchParams: {
    projectId: string;
  };
}

const Tasks = ({ searchParams }: Props) => {
  const { projectId } = searchParams;

  const Task = ({ task }: any) => {
    const [open, setOpen] = useState(false);

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
          <TableCell align="center">{task.status}</TableCell>
          <TableCell align="center">{task.priority}</TableCell>
          <TableCell align="center">{task.assigned_to}</TableCell>
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
              {tasks.map((task) => (
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
