import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

interface ComponentContainerProps {
  title: string;
  flex?: number;
  isLoading?: boolean;
  error?: string;
  children: JSX.Element;
}

export const ComponentContainer = ({
  title,
  flex,
  children
}: ComponentContainerProps): JSX.Element => {
  const theme = useTheme();

  const ComponentLabel = (): JSX.Element => (
    <Box
      bgcolor={theme.palette.primary.main}
      borderBottom='2px solid black'
      borderRight='2px solid black'
      color={theme.palette.primary.contrastText}
      height='auto'
      left={0}
      padding={0.8}
      position='absolute'
      top={0}
      width='auto'
      zIndex='fab'
    >
      <Typography
        className='text-ellipsis'
        sx={{
          [theme.breakpoints.down("md")]: {
            fontSize: "1rem"
          },
          [theme.breakpoints.up("md")]: {
            fontSize: "1.2rem"
          }
        }}
        width='100%'
      >
        {title.toUpperCase()}
      </Typography>
    </Box>
  );

  return (
    <Box
      border='2px solid black'
      boxShadow={4}
      data-testid='component-container'
      flex={flex || 1}
      height='auto'
      minHeight='50vh'
      minWidth={0}
      overflow='hidden'
      position='relative'
      width='100%'
    >
      <ComponentLabel />
      {children}
    </Box>
  );
};
