"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import SideBar from "./SideBar";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{ flexGrow: 1, position: "fixed", zIndex: 30, top: 0, width: "100%" }}
    >
      <AppBar position="static">
        <Toolbar sx={{ bgcolor: "#A855F7" }}>
          <IconButton
            onClick={() => setOpen(true)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TaskyPie
          </Typography>
          <Button
            sx={{ textTransform: "none", fontSize: "1.1rem" }}
            color="inherit"
          >
            Login
          </Button>
          <Button
            sx={{ textTransform: "none", fontSize: "1.1rem" }}
            color="inherit"
          >
            Register
          </Button>
        </Toolbar>
        <SideBar open={open} setOpen={setOpen} />
      </AppBar>
    </Box>
  );
}
