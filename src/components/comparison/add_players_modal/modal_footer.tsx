import React from "react";
import { Box, Button, Typography } from "@mui/material";

interface ModalFooterProps {
  onCancelClick: () => void;
  onConfirmClick: () => void;
}

export const ModalFooter = ({ onCancelClick, onConfirmClick }: ModalFooterProps): JSX.Element => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        justifyContent: "flex-end",
        gap: 4
      }}
    >
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
  );
};
