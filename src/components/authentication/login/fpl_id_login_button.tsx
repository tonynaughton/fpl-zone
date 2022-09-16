import React, { useContext } from "react";
import { Button, Typography } from "@mui/material";
import { getLocalImage } from "helpers";

import { AuthModalContext } from "components/layout";

export const FplIdLoginButton = (): JSX.Element => {
  const { setAuthModalView } = useContext(AuthModalContext);

  return (
    <Button
      fullWidth
      onClick={(): void => setAuthModalView("fplIdLogin")}
      sx={{ fontSize: "1.8em", textTransform: "none", height: "3rem" }}
      variant='contained'
    >
      <img alt='premier-league-logo' className='premier-league-logo' src={getLocalImage("premier-league-logo.png")} />
      <Typography sx={{ ml: 1 }} textTransform='none'>Login with FPL ID</Typography>
    </Button>
  );
};
