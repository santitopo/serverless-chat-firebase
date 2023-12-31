import React from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { getAuth, signOut } from "firebase/auth";

import { Button, Typography, useTheme } from "@mui/material";
import { useIsLoggedIn } from "../providers/Authentication";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/auth";
import UserController from "../firebase/controllers/users";

const CustomAppBar = ({ title }) => {
  const auth = getAuth();
  const theme = useTheme();
  const isLoggedIn = useIsLoggedIn();
  const loggedInUser = useSelector(selectUser);

  return (
    <AppBar
      style={{ background: theme.palette.secondary }}
      position="sticky"
      open={true}
    >
      <Toolbar
        sx={{
          textAlign: "center",
          pr: "24px", // keep right padding when drawer closed
        }}
      >
        <Typography
          color={theme.palette.background}
          component="h1"
          variant="h6"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          {title}
        </Typography>

        {isLoggedIn && (
          <Typography
            color={theme.palette.background}
            component="h1"
            variant="h6"
            sx={{ mr: 1 }}
            noWrap
          >
            {loggedInUser?.displayName
              ? `Bienvenido, ${loggedInUser?.displayName}`
              : "Bienvenido!"}
          </Typography>
        )}

        {isLoggedIn && (
          <Button
            style={{ backgroundColor: "white" }}
            onClick={async () => {
              try {
                await UserController.registerNotificationToken(
                  loggedInUser.uid,
                  null
                );
                await signOut(auth);
              } catch (e) {
                console.log("an error happened signing out", e);
              }
            }}
          >
            {"Cerrar Sesión"}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
