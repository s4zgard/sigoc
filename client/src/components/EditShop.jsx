import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  Paper,
} from "@mui/material";
import { useEditMutation, useGetShopByIdQuery } from "../store";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const EditShop = () => {
  const { shopId } = useParams();
  const { data: shop, isLoading, error } = useGetShopByIdQuery(shopId);
  const [form, setForm] = useState({
    shopName: "",
    shopOwner: "",
    contact: "",
    cnic: "",
    address: "",
    coordinates: "",
    route: "",
    category: "",
  });
  const [errors, setErrors] = useState({});
  const [edit, { isLoading: isUpdating }] = useEditMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && shop) {
      setForm({
        shopName: shop.shopName,
        shopOwner: shop.shopOwner,
        contact: shop.contact,
        cnic: shop.cnic,
        address: shop.address,
        coordinates: shop.coordinates,
        route: shop.route,
        category: shop.category,
      });
    }
  }, [isLoading, shop]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));

    // Custom validation
    if (name === "contact" && !/^03\d{9}$/.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        contact: 'Contact number must start with "03" and be 11 digits long',
      }));
    } else if (name === "cnic" && !/^\d{13}$/.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cnic: "CNIC number must be 13 digits long",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for form errors
    if (Object.values(errors).some((error) => error)) {
      toast.error("Please fix the form errors before submitting");
      return;
    }

    try {
      await edit({ id: shopId, ...form }).unwrap();
      toast.success("Shop updated successfully!");
      navigate(`/view/${shopId}`);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update shop");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          sx={{ mb: 4 }}
        >
          Edit Shop
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Shop Name"
                name="shopName"
                value={form.shopName}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Shop Owner"
                name="shopOwner"
                value={form.shopOwner}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contact Number"
                name="contact"
                value={form.contact}
                onChange={handleChange}
                error={!!errors.contact}
                helperText={errors.contact}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="CNIC Number"
                name="cnic"
                value={form.cnic}
                onChange={handleChange}
                error={!!errors.cnic}
                helperText={errors.cnic}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Coordinates"
                name="coordinates"
                value={form.coordinates}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Route"
                name="route"
                value={form.route}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Category"
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isLoading || isUpdating}
              >
                {isLoading || isUpdating ? "Updating..." : "Update"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default EditShop;
