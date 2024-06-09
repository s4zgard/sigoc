import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useGetShopByIdQuery, useDeleteShopMutation } from "../store";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  IconButton,
  Divider,
  Modal,
  Button,
  Skeleton,
  Paper,
} from "@mui/material";
import {
  FaPencilAlt,
  FaTrash,
  FaMapMarkerAlt,
  FaIdCard,
  FaPhone,
  FaUser,
  FaStore,
  FaMapPin,
  FaTag,
} from "react-icons/fa";
import { toast } from "react-toastify";

const View = () => {
  const { shopId } = useParams();
  const { data: shop, isLoading, error } = useGetShopByIdQuery(shopId);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteShop] = useDeleteShopMutation();

  const navigate = useNavigate();

  React.useEffect(() => {
    if (error) {
      toast.error(`Error: ${error.message}`);
    }
  }, [error]);

  const handleDelete = async () => {
    try {
      await deleteShop(shopId).unwrap();
      toast.success(`${shopToDelete.shopName} deleted`);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
    setIsDeleteModalOpen(false);
    navigate("/shops");
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: "center",
          color: "primary.main",
          fontWeight: "bold",
          background: "linear-gradient(to right, #30CFD0, #330867)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {shop ? (
          `${shop.shopName} Details`
        ) : (
          <Skeleton width="200px" height="24px" />
        )}
      </Typography>
      <Card sx={{ boxShadow: 5, borderRadius: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
              container
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {shop ? shop.shopOwner : <Skeleton width="100px" />}
              </Typography>
              <Box>
                <IconButton
                  component={Link}
                  to={`/edit/${shopId}`}
                  sx={{ "&:hover": { color: "#30CFD0" } }}
                >
                  <FaPencilAlt />
                </IconButton>
                <IconButton
                  onClick={() => setIsDeleteModalOpen(true)}
                  sx={{ "&:hover": { color: "#e74c3c" } }}
                >
                  <FaTrash />
                </IconButton>
              </Box>
            </Grid>
            <Divider sx={{ width: "100%", mb: 2 }} />
            {[
              { label: "Shop Owner", icon: FaUser, value: shop?.shopOwner },
              { label: "Shop Name", icon: FaStore, value: shop?.shopName },
              { label: "Location", icon: FaMapMarkerAlt, value: shop?.address },
              { label: "CNIC", icon: FaIdCard, value: shop?.cnic },
              { label: "Contact", icon: FaPhone, value: shop?.contact },
              {
                label: "Coordinates",
                icon: FaMapPin,
                value: shop?.coordinates,
              },
              { label: "Category", icon: FaTag, value: shop?.category },
            ].map((item, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    background: "#3e3e3e",
                    color: "#fff",
                    fontFamily: "arial",
                  }}
                >
                  <Box display="flex" alignItems="center" marginBottom={1}>
                    <item.icon />
                    <Typography variant="subtitle1" marginLeft={1}>
                      {item.label}
                    </Typography>
                  </Box>
                  <Typography variant="body1">
                    {isLoading ? <Skeleton /> : item.value}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
      {/* Delete Confirmation Modal */}
      <Modal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Confirm Deletion
          </Typography>
          <Typography variant="body1" paragraph>
            Are you sure you want to delete {shop?.shopName || "this shop"}?
          </Typography>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
              sx={{ mr: 2 }}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default View;
