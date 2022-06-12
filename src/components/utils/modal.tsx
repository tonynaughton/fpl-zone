import React from "react";
import { Close } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";

interface CustomModalProps {
  isModalOpen: boolean;
  setModalOpen: (value: boolean) => void;
  title?: string;
  onCancelClick?: () => void;
  onConfirmClick?: () => void;
  children: JSX.Element;
}

export const CustomModal = ({
  isModalOpen,
  setModalOpen,
  title,
  onCancelClick,
  onConfirmClick,
  children
}: CustomModalProps): JSX.Element => {
  return (
    <Box
      onClick={(): void => setModalOpen(false)}
      sx={{
        display: isModalOpen ? "block" : "none",
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        backgroundColor: "rgb(0, 0, 0, 0.5)"
      }}
    >
      <Box
        onClick={(event): void => event.stopPropagation()}
        sx={{
          display: isModalOpen ? "flex" : "none",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxHeight: "90%",
          bgcolor: "white",
          boxShadow: 24,
          p: 4,
          gap: 2,
          flexDirection: "column",
          alignItems: "center",
          zIndex: 2000,
          overflow: "auto"
        }}
      >
        {title && <Typography variant='h3'>{title}</Typography>}
        <IconButton
          onClick={(): void => setModalOpen(false)}
          sx={{ position: "absolute", top: "4%", right: "4%" }}
        >
          <Close />
        </IconButton>
        {children}
        {(onCancelClick || onConfirmClick) && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "flex-end",
              gap: 4
            }}
          >
            { onCancelClick &&
              <Button
                color='warning'
                onClick={onCancelClick}
                sx={{ width: "8vw" }}
                variant='contained'
              >
                <Typography>Cancel</Typography>
              </Button>}
            { onConfirmClick &&
              <Button
                color='success'
                onClick={onConfirmClick}
                sx={{ width: "8vw" }}
                variant='contained'
              >
                <Typography>Confirm</Typography>
              </Button>}
          </Box>
        ) }
      </Box>
    </Box>
  );
};
