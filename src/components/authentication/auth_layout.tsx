import React from "react";
import { Box, Container } from "@mui/material";

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
        <img alt='fpl-zone-logo' src={`${process.env.PUBLIC_URL}/assets/images/logo.png`} width='100%' />
        {props.children}
      </Container>
    </Box>
  );
};
