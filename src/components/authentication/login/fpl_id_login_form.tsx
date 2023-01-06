import React, { useContext, useEffect, useState } from "react";
import { Controller,SubmitHandler, useForm } from "react-hook-form";
import { Box, Button, Link,OutlinedInput, Typography, useTheme } from "@mui/material";
import { getTeamData } from "api/fpl_api_provider";
import { AuthContext } from "app_content";

import { AuthModalContext } from "components/layout";

import { FplIdPopover } from "../fpl_id_popover";

interface FormInput {
  fplId: string;
}

export const FplIdloginForm = (): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { setAuthModalView } = useContext(AuthModalContext);
  const { setFplId } = useContext(AuthContext);
  const theme = useTheme();

  const defaultValues = { fplId: "" };

  const { control, handleSubmit } = useForm<FormInput>({ defaultValues });

  useEffect(() => {
    const listener = (event: { code: string; preventDefault: () => void }): void => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        handleSubmit(onLoginClick)();
      }
    };
    document.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [handleSubmit]);

  const onLoginClick: SubmitHandler<FormInput> = async (data: FormInput) => {
    const fplId = parseInt(data.fplId);

    if (!fplId) {
      setErrorMessage("Your FPL ID must be made up of numbers only");

      return;
    }

    try {
      await getTeamData(fplId);
    } catch (err) {
      setErrorMessage("An FPL team does not exist with the ID you entered");

      return;
    }

    setFplId(fplId);
    setAuthModalView("none");
  };

  return (
    <Box
      className='flex-center'
      flexDirection='column'
      width='100%'
    >
      <form className='auth-form' onSubmit={handleSubmit(onLoginClick)}>
        <Controller
          control={control}
          name='fplId'
          render={({ field: { onChange, value }, fieldState: { error } }): JSX.Element => (
            <OutlinedInput
              autoFocus
              endAdornment={<FplIdPopover />}
              error={!!error}
              fullWidth
              margin='dense'
              onChange={onChange}
              placeholder='FPL ID'
              required
              value={value}
            />
          )}
        />
        { errorMessage &&
          <Typography
            className='text-ellipsis'
            color={theme.palette.warning.main}
            marginTop={2}
            textAlign='center'
          >{errorMessage}
          </Typography>}
        <Button
          color='secondary'
          fullWidth
          sx={{ mt: 2, height: "3rem" }}
          type='submit'
          variant='contained'
        >
          <Typography textTransform='none'>Login with FPL ID</Typography>
        </Button>
      </form>
      <Link onClick={(): void => setAuthModalView("login")}>
        <Typography sx={{ mt: 2 }} textAlign='center'>Return to Login</Typography>
      </Link>
    </Box>
  );
};
