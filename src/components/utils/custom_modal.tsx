import React, { useContext } from "react";
import { Close } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { AppDataContext } from "app_content";

interface CustomModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  compact?: boolean;
  title?: string;
  testId?: string;
  children: JSX.Element;
}

export const CustomModal = ({
  isModalOpen,
  closeModal,
  compact = false,
  title,
  testId,
  children
}: CustomModalProps): JSX.Element => {
  const theme = useTheme();
  const { isMobile } = useContext(AppDataContext);

  return (
    <Box
      bgcolor='rgb(0, 0, 0, 0.5)'
      data-testid={testId}
      display={isModalOpen ? "block" : "none"}
      height='100%'
      left={0}
      onClick={closeModal}
      position='absolute'
      top={0}
      width='100%'
      zIndex='modal'
    >
      <Box
        alignItems='center'
        bgcolor={theme.palette.info.main}
        boxShadow={24}
        display={isModalOpen ? "flex" : "none"}
        flexDirection='column'
        gap={2}
        left='50%'
        maxHeight='95%'
        maxWidth={compact ? "30rem" : "70rem"}
        onClick={(event): void => event.stopPropagation()}
        overflow='auto'
        padding={isMobile ? 2 : 3}
        position='absolute'
        sx={{ transform: "translate(-50%, -50%)" }}
        top='50%'
        width='95%'
        zIndex='modal'
      >
        {title && <Typography variant='h5'>{title}</Typography>}
        <IconButton
          onClick={closeModal}
          sx={{ position: "absolute", top: "2%", right: "2%" }}
        >
          <Close />
        </IconButton>
        {children}
      </Box>
    </Box>
  );
};
