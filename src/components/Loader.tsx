import React from "react";
import { Box, Typography, CircularProgress } from "@material-ui/core";

const Loader = () => {
  return (
    <Box mt={4} textAlign="center" role="loading-panel">
      <Typography variant="h4" gutterBottom>
        LOADING...
      </Typography>
      <CircularProgress size={100} thickness={4} />
    </Box>
  );
};

export default Loader;
