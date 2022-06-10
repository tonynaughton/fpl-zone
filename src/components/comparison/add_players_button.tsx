import React from "react";
import { Button } from "@mui/material";

export const AddPlayersButton = (): JSX.Element => {
  return (
      <Button
        sx={{ display: "relative", top: "100%", right: 0 }}
        variant='contained'
      >
        Add Player
      </Button>
    );
};
