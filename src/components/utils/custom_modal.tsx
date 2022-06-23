import React from "react";
import { Close } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";

interface CustomModalProps {
  isModalOpen: boolean;
  setModalOpen: (value: boolean) => void;
  compact?: boolean;
  title?: string;
  onCancelClick?: () => void;
  onConfirmClick?: () => void;
  testId?: string;
  children: JSX.Element;
}

export const CustomModal = ({
  isModalOpen,
  setModalOpen,
  compact = false,
  title,
  onCancelClick,
  onConfirmClick,
  testId,
  children
}: CustomModalProps): JSX.Element => {
  return (
    <Box
      data-testid={testId}
      display={isModalOpen ? "block" : "none"}
      height='100%'
      left={0}
      onClick={(): void => setModalOpen(false)}
      position='absolute'
      sx={{ backgroundColor: "rgb(0, 0, 0, 0.5)" }}
      top={0}
      width='100%'
      zIndex='modal'
    >
      <Box
        alignItems='center'
        boxShadow={24}
        display={isModalOpen ? "flex" : "none"}
        flexDirection='column'
        gap={2}
        left='50%'
        maxHeight='90%'
        maxWidth={compact ? "50rem" : "70rem"}
        onClick={(event): void => event.stopPropagation()}
        overflow='auto'
        padding={4}
        position='absolute'
        sx={{ transform: "translate(-50%, -50%)", bgcolor: "#F9F9F9" }}
        top='50%'
        width={compact ? "50%" : "90%"}
        zIndex='modal'
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
            alignItems='center'
            display='flex'
            gap={4}
            justifyContent='flex-end'
            width='100%'
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
