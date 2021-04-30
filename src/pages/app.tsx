import React, { useContext, useEffect } from "react";
import { Router, RouteComponentProps } from "@reach/router";
import { IdentityContext } from "../../IdentityContextProvider";

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
import { Button } from "gatsby-theme-material-ui";
import { Link, navigate } from "gatsby";
import Dashboard from "../components/Dashboard";
import Loader from "../components/Loader";

const App = () => {
  const { user, identity, loginCompleted } = useContext(IdentityContext);

  useEffect(() => {
    if (!user && loginCompleted) {
      console.log("navigating from App to Index ", user);

      navigate("/", { replace: true });
    }
  }, [user, loginCompleted]);

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
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </Container>
  );
};
export default App;
