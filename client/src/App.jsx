import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import Navbar from "./components/Navbar";
import { Container } from "@mui/material";

const App = () => {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Navbar />

      <Container
        maxWidth="lg" // Set the maximum width to large (80% of the screen on PC and Tablets)
        sx={{
          flexGrow: 1, // Allow the container to grow to fill the remaining space
          mt: 5, // Add top margin for spacing
        }}
      >
        <Outlet />
      </Container>
      <ToastContainer />
    </div>
  );
};
export default App;
