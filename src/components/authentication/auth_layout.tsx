import React from "react";
import { Box, Container } from "@mui/material";

import Logo from "components/logo/logo";

export function AuthLayout(props: { children: JSX.Element }): JSX.Element {
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
        <Logo />
        {props.children}
      </Container>
    </Box>
  );
}
