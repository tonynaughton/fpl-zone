import React, { useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";

interface ControlledCheckboxProps {
  onPlayerSelect: (value: boolean) => void;
  checkedValue: boolean;
  isDisabled: boolean;
}

export default function ControlledCheckbox({
  onPlayerSelect,
  checkedValue,
  isDisabled
}: ControlledCheckboxProps): JSX.Element {
  const [checked, setChecked] = React.useState(false);

  useEffect(() => {
    setChecked(checkedValue);
  }, [checkedValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setChecked(event.target.checked);
    onPlayerSelect(event.target.checked);
  };

  return (
    <Checkbox
      checked={checked}
      disabled={!checked && isDisabled}
      inputProps={{ "aria-label": "controlled" }}
      onChange={handleChange}
    />
  );
}
