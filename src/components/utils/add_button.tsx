import React from "react";
import { Add } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

interface AddButtonProps {
  compact?: boolean;
}

export const AddButton = ({ compact }: AddButtonProps): JSX.Element => {
  const dimen = compact ? "3vh" : "5vh";

  return (
    <Box
      borderRadius='50%'
      className='flex-center'
      data-testid='add-button'
      height={dimen}
      sx={{ backgroundColor: "#5fdd6b" }}
      width={dimen}
    >
      <IconButton aria-label='add player button' size='small'>
        <Add fontSize={compact ? "small" : "medium"} />
      </IconButton>
    </Box>
  );
};
