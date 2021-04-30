import React, { useContext, useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Container,
  Tooltip,
  Typography,
  Toolbar,
  Button,
  IconButton,
} from "@material-ui/core";
import { GitHub, PowerSettingsNew } from "@material-ui/icons";
import { Link, navigate } from "gatsby";
import { IdentityContext } from "../utils/IdentityContextProvider";

const IndexPage = () => {
  const [value, setValue] = useState(0);
  const { user, identity } = useContext(IdentityContext);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    // if (user) {
    //   console.log("navigating from Index to App ", user);
    //   navigate("/app", { replace: true });
    // }
  }, [user]);

  return (
    <Container>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            Todos App
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

      <Box mt={2} display="flex" flexDirection="column">
        <Typography variant="h4" gutterBottom>
          {user
            ? `You are logged in ${user.user_metadata.full_name}`
            : "Get Stuff Done"}
        </Typography>
        <Box mb={2}>
          {user ? (
            <Button
              color="primary"
              variant="contained"
              onClick={async () => {
                await navigate("/app");
              }}
              fullWidth
              size="large"
            >
              Proceed To Your Dashboard
            </Button>
          ) : (
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                identity.open("login");
              }}
              fullWidth
              size="large"
            >
              Login
            </Button>
          )}
        </Box>
        {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      </Box>
    </Container>
  );
};

export default IndexPage;
