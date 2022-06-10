import * as React from "react";
import Checkbox from "@mui/material/Checkbox";

interface ControlledCheckboxProps {
  onPlayerSelect: (value: boolean) => void;
}

export default function ControlledCheckbox({ onPlayerSelect }: ControlledCheckboxProps) {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    onPlayerSelect(event.target.checked);
  };

  return (
    <Checkbox
      checked={checked}
      inputProps={{ "aria-label": "controlled" }}
      onChange={handleChange}
    />
  );
}
