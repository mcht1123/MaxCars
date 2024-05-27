import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

function NoRecords() {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Typography>No Records Found</Typography>
    </Box>
  );
}

export default NoRecords;
