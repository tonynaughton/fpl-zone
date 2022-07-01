import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

interface ComponentContainerProps {
  title: string;
  isLoading?: boolean;
  error?: string;
  children: JSX.Element;
}

export const ComponentContainer = ({
  title,
  children
}: ComponentContainerProps): JSX.Element => {
  const theme = useTheme();

  return (
    <Box
      border='2px solid black'
      boxShadow={4}
      height='100%'
      minWidth={0}
      position='relative'
      width='100%'
    >
      <Box
        bgcolor={theme.palette.primary.main}
        borderBottom='2px solid black'
        borderRight='2px solid black'
        color={theme.palette.primary.contrastText}
        height='auto'
        left={0}
        maxWidth='15vw'
        padding={0.8}
        position='absolute'
        top={0}
        width='auto'
        zIndex='fab'
      >
        <Typography className='text-ellipsis' variant='h3' width='100%'>
          {title.toUpperCase()}
        </Typography>
      </Box>
      {children}
    </Box>
  );
};
