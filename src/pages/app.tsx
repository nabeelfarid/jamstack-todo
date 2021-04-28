import React, { useContext, useState } from "react";
import { Router, RouteComponentProps, Link } from "@reach/router";
import { IdentityContext } from "../../IdentityContextProvider";

import {
  AppBar,
  Box,
  Container,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";

import { Button } from "gatsby-theme-material-ui";
import { Link as GatsbyLink } from "gatsby";

const Dashboard = (props: RouteComponentProps) => {
  const { user, identity } = useContext(IdentityContext);
  return (
    <Box mt={2} display="flex" flexDirection="column">
      <Typography variant="h4" gutterBottom>
        This is your dashboard: {user.user_metadata.full_name}
      </Typography>
    </Box>
  );
};

const DashboardLoggedOut = (props: RouteComponentProps) => {
  const { identity } = useContext(IdentityContext);

  return (
    <Box mt={2} display="flex" flexDirection="column">
      <Typography variant="h4" gutterBottom>
        Login into your dashboard
      </Typography>
      <Box mb={2}>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            identity.open();
          }}
          fullWidth
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

const App = () => {
  const [value, setValue] = useState(1);
  const { user, identity } = useContext(IdentityContext);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container>
      <AppBar position="static" color="default">
        <Tabs
          variant="standard"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <Tab label="Home" to="/" component={GatsbyLink} />
          <Tab label="Dashbpard" to="/app" component={GatsbyLink} />
          {user && (
            <Tab
              label={`Logout ${user.user_metadata.full_name}`}
              onClick={async () => await identity.logout()}
            />
          )}
        </Tabs>
      </AppBar>
      <Router basepath="/app">
        {user ? <Dashboard path="/" /> : <DashboardLoggedOut path="/" />}
      </Router>

      <pre>{JSON.stringify(user, null, 2)}</pre>
    </Container>
  );
};
export default App;
