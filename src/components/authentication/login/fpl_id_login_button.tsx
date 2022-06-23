import React from "react";
import { Button, Typography } from "@mui/material";
import { getLocalImage } from "helpers";

import { AuthModalView } from "components/layout";

interface FplIdLoginButtonProps {
  openAuthModal: (value: AuthModalView) => void;
}

export const FplIdLoginButton = ({ openAuthModal }: FplIdLoginButtonProps): JSX.Element => (
  <Button
    fullWidth
    onClick={(): void => openAuthModal(AuthModalView.FplIdLogin)}
    sx={{ fontSize: "1.8em", textTransform: "none", height: "3rem" }}
    variant='contained'
  >
    <img alt='premier-league-logo' className='premier-league-logo' src={getLocalImage("premier-league-logo.png")} />
    <Typography sx={{ ml: 1 }} textTransform='none' variant='h3'>Login with FPL ID</Typography>
  </Button>
);
