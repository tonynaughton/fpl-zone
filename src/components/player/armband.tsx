import React from "react";
import { Box } from "@mui/material";

interface ArmbandProps {
  isVice?: boolean;
}

export const Armband = ({ isVice = false }: ArmbandProps): JSX.Element => {
  return (
    <Box
      data-testid='armband-container'
      sx={{
        borderRadius: "50%",
        backgroundColor: "white",
        border: "1px solid black",
        position: "absolute",
        top: 0,
        left: 0,
        width: "1.5vw",
        height: "1.5vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {isVice ? "V" : "C"}
    </Box>
  );
};
