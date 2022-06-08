import React from "react";
import { Box } from "@mui/material";

export const Startup = (props: { children: JSX.Element }): JSX.Element => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        backgroundColor: "#16B7EA"
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
          maxWidth: "30rem"
        }}
      >
        <img alt='fpl-zone-logo' src={`${process.env.PUBLIC_URL}/assets/images/logo.png`} width='100%' />
        {props.children}
      </Box>
    </Box>
  );
};
