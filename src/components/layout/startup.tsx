import React from "react";
import { Box, useTheme } from "@mui/material";
import { getLocalImage } from "helpers";

import { Notifier, NotifierType } from "./notifier";

interface StartupProps {
  notifierMessage?: string;
  notifierType?: NotifierType;
}

export const Startup = ({ notifierMessage, notifierType }: StartupProps): JSX.Element => {
  const theme = useTheme();

  return (
    <Box
      bgcolor={theme.palette.primary.main}
      height='100vh'
      width='100%'
    >
      <Box
        className='flex-center'
        height='100%'
        margin='auto'
        width='50%'
      >
        <Box
          alignItems='center'
          display='flex'
          flexDirection='column'
          gap='5vh'
          height='50%'
          width='100%'
        >
          <img alt='fpl-zone-logo' src={getLocalImage(`logo.png`)} width='100%' />
          <Notifier message={notifierMessage} type={notifierType} />
        </Box>
      </Box>
    </Box>
  );
};
