import React, { useContext, useState } from "react";
import {
  AppBar,
  Box,
  Container,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";

import { Button } from "gatsby-theme-material-ui";
import { Link } from "gatsby";
import { IdentityContext } from "../../IdentityContextProvider";

const IndexPage = () => {
  const [value, setValue] = useState(0);
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
          <Tab label="Home" to="/" component={Link} />
          <Tab label="Dashbpard" to="/app" component={Link} />
          {user && (
            <Tab
              label={`Logout ${user.user_metadata.full_name}`}
              onClick={async () => await identity.logout()}
            />
          )}{" "}
        </Tabs>
      </AppBar>
      <Box mt={2} display="flex" flexDirection="column">
        <Typography variant="h4" gutterBottom>
          Get Stuff Done
        </Typography>
        <Box mb={2}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              if (user) {
                (async () => identity.logout())();
              } else {
                identity.open();
              }
            }}
            fullWidth
          >
            {user ? "Logout" : "Login"}
          </Button>
        </Box>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </Box>
    </Container>
  );
};

export default IndexPage;
