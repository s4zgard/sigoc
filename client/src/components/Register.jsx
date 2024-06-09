import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { useRegisterMutation } from "../store";
import { useState } from "react";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { userSgc } = useSelector((state) => state.auth);
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, name } = formData;
    try {
      const res = await register({ name, email, password }).unwrap();
      toast.success("User registered successfully");
      navigate("/users");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  if (!userSgc?.isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {userSgc && userSgc.isAdmin && (
        <Container maxWidth="xs">
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
              Register
            </Typography>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Name"
                type="text"
                variant="outlined"
                id="name"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                value={formData.name}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
                id="email"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                value={formData.email}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                id="password"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                value={formData.password}
              />
            </Box>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register
            </Button>
          </Box>
        </Container>
      )}
    </>
  );
};

export default Register;
