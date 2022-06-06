import React from "react";
import { Box, Typography } from "@mui/material";

interface LogoProps {
  compactLogo?: boolean;
}

export default function Logo({ compactLogo = false }: LogoProps): JSX.Element {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: 1.5, columnGap: 1, width: "100%" }}>
      <Box flexShrink="1" maxWidth="20%">
        <img
          className="football-icon"
          alt="logo"
          src={`${process.env.PUBLIC_URL}/assets/images/football.png`}
          height="auto"
          width="100%"
        />
      </Box>
      <Typography
        component="h1"
        fontSize={ compactLogo ? "1.7vw" : "5vw"}
        fontWeight="600"
        sx={{ userSelect: "none" }}
        color="primary.contrastText"
        whiteSpace="nowrap"
      >
        FPL Zone
      </Typography>
    </Box>
  );
}
