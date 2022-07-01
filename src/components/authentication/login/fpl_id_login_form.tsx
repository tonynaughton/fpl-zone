import React, { useContext, useEffect, useState } from "react";
import { Controller,SubmitHandler, useForm } from "react-hook-form";
import { Box, Button, Link,OutlinedInput, Typography, useTheme } from "@mui/material";
import { getTeamData } from "api/fpl_api_provider";
import { FplIdContext } from "app_content";

import { AuthModalView } from "components/layout";

import { FplIdPopover } from "../fpl_id_popover";

interface FplIdLoginFormProps {
  openAuthModal: (value: AuthModalView) => void;
  closeAuthModal: () => void;
}

interface FormInput {
  fplId: string;
}

export const FplIdloginForm = ({ openAuthModal, closeAuthModal }: FplIdLoginFormProps): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { setFplId } = useContext(FplIdContext);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleSubmit]);

  const onLoginClick: SubmitHandler<FormInput> = async (data: FormInput) => {
    const fplId = parseInt(data.fplId);

    try {
      await getTeamData(fplId);
    } catch (err) {
      setErrorMessage("An FPL team does not exist with the ID you entered");

      return;
    }

    setFplId(fplId);
    closeAuthModal();
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
              sx={{
                "& input[type=number]": {
                  MozAppearance: "textfield"
                },
                "& input[type=number]::-webkit-outer-spin-button": {
                  WebkitAppearance: "none",
                  margin: 0
                },
                "& input[type=number]::-webkit-inner-spin-button": {
                  WebkitAppearance: "none",
                  margin: 0
                }
              }}
              type='number'
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
          <Typography textTransform='none' variant='h3'>Login with FPL ID</Typography>
        </Button>
      </form>
      <Link onClick={(): void => openAuthModal(AuthModalView.Login)}>
        <Typography sx={{ mt: 2 }} textAlign='center'>Return to Login</Typography>
      </Link>
    </Box>
  );
};
