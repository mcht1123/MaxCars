import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
function NavBar() {
  return (
    <AppBar>
      <Toolbar>
        <IconButton size="large" edge="start" color="a1a0a2" aria-label="logo">
          <DirectionsCarIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, textAlign: "left" }}
        >
          MAX CARS
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
