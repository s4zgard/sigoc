import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { GoKey, GoLock } from "react-icons/go";
import {
  FaPowerOff,
  FaShopware,
  FaStore,
  FaStoreAlt,
  FaUserCircle,
  FaUserFriends,
} from "react-icons/fa";
import { setCredentials, useLogoutMutation } from "../store";
import { toast } from "react-toastify";

const Navbar = () => {
  const { userSgc } = useSelector((state) => state.auth);
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      const res = await logout();
      dispatch(setCredentials(null));
      toast.success("Logged Out");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar className="flex justify-between">
        <Typography variant="h6" component="div">
          <Link to="/" className="text-white text-decoration-none">
            Sigoc
          </Link>
        </Typography>
        <div>
          {!userSgc ? (
            <Button
              color="inherit"
              component={Link}
              to="/login"
              startIcon={<GoKey />}
            >
              Login
            </Button>
          ) : (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <FaUserCircle size={24} className="mr-2" />{" "}
                {/* Use the FaUserCircle icon */}
                <Typography variant="body1" className="ml-2">
                  {userSgc.name}
                </Typography>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom", // Adjust the vertical position to "bottom"
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {userSgc.isAdmin && (
                  <div>
                    <MenuItem
                      onClick={handleClose}
                      component={Link}
                      to="/register"
                    >
                      <GoLock className="mr-2" /> Register
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      component={Link}
                      to="/shops"
                    >
                      <FaStoreAlt className="mr-2" /> All Shops
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      component={Link}
                      to="/users"
                    >
                      <FaUserFriends className="mr-2" /> All Users
                    </MenuItem>
                  </div>
                )}
                <MenuItem onClick={handleLogout}>
                  <FaPowerOff className="mr-2" /> Logout
                </MenuItem>
              </Menu>
            </div>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
