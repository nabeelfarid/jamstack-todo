import React from "react";
import { Box, Typography } from "@material-ui/core";

export interface ErrorProps {
  error: any;
}

const Error: React.FC<ErrorProps> = ({ error }) => {
  return (
    <Box mt={4} role="error-panel">
      <Typography variant="h4" color="error" gutterBottom>
        ERROR:
      </Typography>

      <Typography component="pre">{JSON.stringify(error, null, 4)}</Typography>
    </Box>
  );
};

export default Error;
