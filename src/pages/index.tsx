import { Box, Container, Typography } from "@material-ui/core";
import { Button } from "gatsby-theme-material-ui";
import * as React from "react";

// markup
const IndexPage = () => {
  return (
    <Container>
      <Box display="flex" flexDirection="column">
        <Typography variant="h1" gutterBottom>
          Get Stuff Done
        </Typography>
        <Button
          color="primary"
          variant="contained"
          onClick={() => alert("clicked")}
        >
          A button!
        </Button>
      </Box>
    </Container>
  );
};

export default IndexPage;
