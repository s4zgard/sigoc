import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
  IconButton,
  Tooltip,
  Modal,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useDeleteShopMutation, useGetShopsQuery } from "../store"; // Import the useGetShopsQuery hook
import { toast } from "react-toastify"; // Import the toast functions
import { FaEye, FaPencilAlt, FaTrash } from "react-icons/fa"; // Import the icons
import { Link } from "react-router-dom";

const Shops = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [shopToDelete, setShopToDelete] = React.useState(null);

  const { data: shops, error, isLoading, refetch } = useGetShopsQuery();
  const [deleteShop] = useDeleteShopMutation();
  const handleOpenModal = (shop) => {
    setShopToDelete(shop);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setShopToDelete(null);
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      await deleteShop(shopToDelete._id);
      await refetch();
      toast.success(`${shopToDelete.shopName} deleted`);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
    setIsModalOpen(false);
    // Add logic to delete the shop from the database
  };

  // Display error toast if there is an error
  if (error) {
    toast.error(`Error: ${error.message}`);
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Shops
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ mt: 4, boxShadow: 3, borderRadius: 2, overflowX: "auto" }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#f3f3f3" }}>
            <TableRow>
              <TableCell>Shop Name</TableCell>
              <TableCell>Shop Owner</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading
              ? // Render skeleton loader while loading
                Array.from(Array(5).keys()).map((index) => (
                  <TableRow key={index}>
                    <TableCell colSpan={5}>
                      <Skeleton />
                    </TableCell>
                  </TableRow>
                ))
              : // Render table rows with fetched data
                shops.map((shop) => (
                  <TableRow
                    key={shop._id}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                    }}
                  >
                    <TableCell>{shop.shopName}</TableCell>
                    <TableCell>{shop.shopOwner}</TableCell>
                    <TableCell>{shop.contact}</TableCell>
                    <TableCell>
                      {/* Truncate long addresses */}
                      {shop.address.length > 15
                        ? `${shop.address.slice(0, 15)}...`
                        : shop.address}
                    </TableCell>
                    <TableCell>
                      <Tooltip title="View">
                        <IconButton
                          component={Link}
                          to={`/view/${shop._id}`}
                          sx={{ "&:hover": { color: "#30CFD0" } }}
                        >
                          <FaEye fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton
                          component={Link}
                          to={`/edit/${shop._id}`}
                          sx={{ "&:hover": { color: "blue" } }}
                        >
                          <FaPencilAlt fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          onClick={() => handleOpenModal(shop)}
                          sx={{ "&:hover": { color: "red" } }}
                        >
                          <FaTrash fontSize="small" />
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
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Confirm Deletion
          </Typography>
          <Typography variant="body1" paragraph>
            Are you sure you want to delete {shopToDelete?.shopName}?
          </Typography>
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="error"
              style={{ marginRight: "10px" }}
              onClick={handleDelete}
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

export default Shops;
