import Cars from "./pages/Cars";
import NavBar from "./components/NavBar";
import "./App.css";
import { Box, Stack } from "@mui/material";

function App() {
  return (
    <Box>
      <Stack direction="column" spacing={10} justifyContent="space-between">
        <NavBar />
        <Cars />
      </Stack>
    </Box>
  );
}

export default App;
