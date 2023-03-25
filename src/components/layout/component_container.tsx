import React from "react";
import { Box } from "@mui/material";

interface ComponentContainerProps {
  title: string;
  flex?: number;
  isLoading?: boolean;
  error?: string;
  children: JSX.Element;
}

export const ComponentContainer = ({
  flex,
  children
}: ComponentContainerProps): JSX.Element => {

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
      {children}
    </Box>
  );
};
