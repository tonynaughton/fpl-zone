import React from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";

interface TogglePasswordVisProps {
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
}

export function TogglePasswordVis({
  showPassword,
  setShowPassword,
}: TogglePasswordVisProps): JSX.Element {
  return (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={(): void => setShowPassword(!showPassword)}
        onMouseDown={(event): void => event.preventDefault()}
        edge="end"
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );
}
