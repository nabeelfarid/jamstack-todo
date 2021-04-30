import React from "react";
import { Box, Typography, CircularProgress } from "@material-ui/core";

interface LoaderProps {
  showCircularProgress?: boolean;
}
const Loader: React.FC<LoaderProps> = ({ showCircularProgress = true }) => {
  return (
    <Box mt={4} textAlign="center" role="loading-panel">
      <Typography variant="h4" gutterBottom>
        LOADING...
      </Typography>
      {showCircularProgress && <CircularProgress size={100} thickness={4} />}
    </Box>
  );
};

export default Loader;
