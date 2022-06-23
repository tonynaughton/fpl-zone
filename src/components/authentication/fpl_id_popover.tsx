import React from "react";
import { Info } from "@mui/icons-material";
import { Box, IconButton, InputAdornment,Popover, Typography } from "@mui/material";

export const FplIdPopover = (): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const isPopoverOpen = Boolean(anchorEl);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = (): void => {
    setAnchorEl(null);
  };

  return (

    <InputAdornment position='end'>
      <IconButton
        edge='end'
        onMouseDown={(event): void => event.preventDefault()}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        sx={{ cursor: "auto" }}
      >
        <Info />
      </IconButton>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        onClose={handlePopoverClose}
        open={isPopoverOpen}
        sx={{ pointerEvents: "none" }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
      >
        <Box maxWidth='20rem'>
          <Typography sx={{ p: 1.5 }} textAlign='center'>
                        You can find your FPL ID in the URL when viewing the &apos;Points&apos; page on FPL
          </Typography>
        </Box>
      </Popover>
    </InputAdornment>
  );
};
