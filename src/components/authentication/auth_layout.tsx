import React from "react";
import { Box, Container } from "@mui/material";

export const AuthLayout = (props: { children: JSX.Element }): JSX.Element => {
  return (
    <Box
      className='auth-view'
      display='flex'
      justifyContent='center'
      alignItems='center'
      minHeight='100vh'
      sx={{ backgroundColor: "#16B7EA" }}
    >
      <Container component='main' maxWidth='sm'>
        <img src={`${process.env.PUBLIC_URL}/assets/images/logo.png`} alt="fpl-zone-logo" width='100%' />
        {props.children}
      </Container>
    </Box>
  );
};
