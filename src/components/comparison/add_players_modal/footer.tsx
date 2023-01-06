import React, { useContext } from "react";
import { Done } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { GridPagination } from "@mui/x-data-grid";
import { AppDataContext } from "app_content";

interface CustomFooterProps {
  onConfirmClick: () => void;
}

export const CustomFooter = ({ onConfirmClick }: CustomFooterProps): JSX.Element => {
  const { isMobile } = useContext(AppDataContext);

  const ConfirmButton = (): JSX.Element => (
    <Button
      color='success'
      onClick={onConfirmClick}
      startIcon={!isMobile && <Done />}
      variant='contained'
    >
      {isMobile ? <Done /> : <Typography>Confirm</Typography>}
    </Button>
  );

  return (
    <Box
      alignItems='center'
      borderTop='1px solid rgba(224, 224, 224, 1)'
      display='flex'
      justifyContent='space-between'
      px='1rem'
      sx={{
        ".MuiTablePagination-toolbar": {
          p: 0
        }
      }}
    >
      <GridPagination />
      <ConfirmButton />
    </Box>
  );
};
