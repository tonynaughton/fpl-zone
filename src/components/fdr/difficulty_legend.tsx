import React from "react";
import { Box, Typography } from "@mui/material";

export const fdrColours = {
  1: "#09BA59",
  2: "#93E02D",
  3: "#F5CF38",
  4: "#DE7628",
  5: "#FF193C",
};

export default function DifficultyLegend(): JSX.Element {
  return (
    <Box display="flex" sx={{ alignItems: "center", minHeight: "50px" }}>
      <Typography sx={{ mr: 1 }}>Difficulty legend:</Typography>
      {Object.keys(fdrColours).map((colour) => {
        return (
          <Box
            component="div"
            key={colour}
            sx={{ backgroundColor: fdrColours[colour], p: "0 10px" }}
          >
            {colour}
          </Box>
        );
      })}
    </Box>
  );
}
