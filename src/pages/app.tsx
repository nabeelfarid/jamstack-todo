import React, { useContext, useEffect } from "react";
import { Router } from "@reach/router";
import {
  IdentityContext,
  IsAuthenticated,
} from "../utils/IdentityContextProvider";

import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Tooltip,
  Typography,
  IconButton,
} from "@material-ui/core";
import { GitHub, PowerSettingsNew } from "@material-ui/icons";
import { Link, navigate } from "gatsby";
import Dashboard from "../components/Dashboard";
import Loader from "../components/Loader";

const App = () => {
  const { user, identity } = useContext(IdentityContext);

  useEffect(() => {
    console.log("inside app useeffect - user", user);

    //if the user is already logged in then check in localstorage as well as using IsAuthenticated()
    //because user object from identityContext is not available on first call of Page useEffect
    if (!user && !IsAuthenticated()) {
      console.log("navigating from App to Index ", user);

      navigate("/", { replace: true });
    }
  }, [user]);

  return (
    <Container>
      <AppBar position="relative" color="default">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/app"
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            Todos App Dashboard
          </Typography>
          <Box flexGrow={1} />
          {user && (
            <Box mr={1}>
              <Typography variant="body2">
                {user.user_metadata.full_name}{" "}
              </Typography>
            </Box>
          )}
          <Tooltip title="Github Repo">
            <IconButton
              aria-label="github"
              href="https://github.com/nabeelfarid/jamstack-todo"
              target="blank"
            >
              <GitHub />
            </IconButton>
          </Tooltip>
          {user && (
            <Tooltip title="Logout">
              <IconButton
                aria-label="logout"
                onClick={async () => await identity.logout()}
                color="secondary"
              >
                <PowerSettingsNew />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      </AppBar>
      {!user ? (
        <Loader showCircularProgress={false} />
      ) : (
        <Router basepath="/app">
          <Dashboard path="/" />
        </Router>
      )}
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
    </Container>
  );
};
export default App;
