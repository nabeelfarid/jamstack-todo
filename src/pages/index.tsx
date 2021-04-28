import React from "react";
import { Box, Container, Typography } from "@material-ui/core";
import { Button } from "gatsby-theme-material-ui";
import netlifyIdentity from "netlify-identity-widget";
import { useEffect } from "react";

const IndexPage = () => {
  useEffect(() => {
    netlifyIdentity.init({});
  }, []);
  return (
    <Container>
      <Box display="flex" flexDirection="column">
        <Typography variant="h1" gutterBottom>
          Get Stuff Done
        </Typography>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            netlifyIdentity.open();
          }}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default IndexPage;
