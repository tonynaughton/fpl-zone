import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { Button, Typography } from "@mui/material";
import { signInWithGoogle } from "config";

export const GoogleLoginButton = (): JSX.Element => (
  <Button
    fullWidth
    onClick={signInWithGoogle}
    sx={{ fontSize: "1.8em", textTransform: "none", height: "3rem" }}
    variant='contained'
  >
    <GoogleIcon sx={{ mr: 2 }} />
    <Typography textTransform='none'>Continue with Google</Typography>
  </Button>
);
