import React from "react";
import { Box } from "@mui/material";
import Logo from "components/logo/logo";

export function Startup(props: { children: JSX.Element }): JSX.Element {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        backgroundColor: "#16B7EA",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "100%",
          margin: "auto",
          rowGap: "5%",
          width: "50%",
        }}
      >
        <Logo />
        {props.children}
      </Box>
    </Box>
  );
}
