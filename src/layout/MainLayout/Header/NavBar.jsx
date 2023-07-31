import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import img from "../../../assets/images/users/user-round.svg";
import { AppRegistrationRounded, LockOutlined } from "@mui/icons-material";
import LoginModal from "./Login";
import { Link } from "react-router-dom";
export default function AccountMenu() {
  const { isAuthenticated, signOutUser } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: {
            xs: "none",
            md: "flex",
          },
          alignItems: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        {!!isAuthenticated ? (
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: "auto" }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 38, height: 38 }} src={img}>
                M
              </Avatar>
            </IconButton>
          </Tooltip>
        ) : (
          <Link
            to="/login"
            style={{
              marginLeft: "auto",
            }}
          >
            <Button
              variant="contained"
              startIcon={<LockOutlined />}
              color="secondary"
              sx={{ ml: "auto", mr: 1 }}
            >
              <Typography
                sx={{
                  color: "#fff",
                  fontWeight: "500",
                  textTransform: "uppercase",
                }}
              >
                Login
              </Typography>
            </Button>
          </Link>
        )}
      </Box>
      <Box
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
        }}
      >
        {!!isAuthenticated ? (
          <>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: "auto" }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 38, height: 38 }} src={img}>
                  M
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={signOutUser}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Link
            to="/login"
            style={{
              marginLeft: "auto",
            }}
          >
            <Button
              variant="contained"
              startIcon={<LockOutlined />}
              size="small"
              color="secondary"
              sx={{ ml: "auto", mr: 1 }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#fff",
                  textTransform: "uppercase",
                }}
              >
                Login
              </Typography>
            </Button>
          </Link>
        )}
      </Box>
    </React.Fragment>
  );
}
