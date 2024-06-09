import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Skeleton,
  Modal,
  Box,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import { FaPencilAlt, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import { useDeleteUserMutation, useGetAllUsersQuery } from "../store";
import { toast } from "react-toastify";

const Users = () => {
  const { data: users, isLoading, error, refetch } = useGetAllUsersQuery();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteUser(selectedUser._id);
      await refetch();

      toast.success(`User ${selectedUser.name} deleted`);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
    setIsModalOpen(false);
  };

  // Display error toast if there is an error
  if (error) {
    toast.error(`Error: ${error.message}`);
  }

  return (
    <>
      <Typography variant="h4">Users</Typography>
      <TableContainer
        component={Paper}
        sx={{ mt: 4, borderRadius: 2, overflowX: "auto" }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#f3f3f3" }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Admin</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading
              ? // Render skeleton loader while loading
                Array.from(Array(5).keys()).map((index) => (
                  <TableRow key={index}>
                    <TableCell colSpan={4}>
                      <Skeleton />
                    </TableCell>
                  </TableRow>
                ))
              : // Render table rows with fetched data
                users.map((user) => (
                  <TableRow
                    key={user.id}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                    }}
                  >
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {user.isAdmin ? (
                        <FaCheck className="text-green-500" />
                      ) : (
                        <FaTimes className="text-red-500" />
                      )}
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <IconButton
                          component={Link}
                          to={`/edit/${user.id}`}
                          sx={{
                            "&:hover": { color: "blue" },
                            fontSize: 16,
                          }}
                        >
                          <FaPencilAlt />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          onClick={() => handleDelete(user)}
                          disabled={user.isAdmin}
                          sx={{ fontSize: 16 }}
                        >
                          <FaTrash />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            border: "2px solid #3e3e3e",
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Confirm Deletion
          </Typography>
          <Typography variant="body1" paragraph>
            Are you sure you want to delete user {selectedUser?.name}?
          </Typography>
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="error"
              style={{ marginRight: "10px" }}
              onClick={handleConfirmDelete}
            >
              Delete
            </Button>
            <Button variant="contained" onClick={handleCloseModal}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Users;
