import React from "react";
import { Box, Container } from "@mui/material";
import { getLocalImage } from "helpers";

export const AuthLayout = (props: { children: JSX.Element }): JSX.Element => {
  return (
    <Box
      alignItems='center'
      className='auth-view'
      display='flex'
      justifyContent='center'
      minHeight='100vh'
      sx={{ backgroundColor: "#16B7EA" }}
    >
      <Container component='main' maxWidth='sm'>
        <img alt='fpl-zone-logo' src={getLocalImage("logo.png")} width='100%' />
        {props.children}
      </Container>
    </Box>
  );
};
