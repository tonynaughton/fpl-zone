import React from "react";
import { Box, Button, Typography } from "@mui/material";

import { CustomPagination } from "./pagination";

interface CustomFooterProps {
  onCancelClick: () => void;
  onConfirmClick: () => void;
}

export const CustomFooter = ({ onCancelClick, onConfirmClick }: CustomFooterProps): JSX.Element => (
  <Box
    alignItems='center'
    borderTop='1px solid rgba(224, 224, 224, 1)'
    display='flex'
    justifyContent='space-between'
    minHeight={52}
    p={2}
  >
    <CustomPagination />
    <Box display='flex' gap={3}>
      <Button
        color='warning'
        onClick={onCancelClick}
        sx={{ width: "8vw" }}
        variant='contained'
      >
        <Typography>Cancel</Typography>
      </Button>
      <Button
        color='success'
        onClick={onConfirmClick}
        sx={{ width: "8vw" }}
        variant='contained'
      >
        <Typography>Confirm</Typography>
      </Button>
    </Box>
  </Box>
);
