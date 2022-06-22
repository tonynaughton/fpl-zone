import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { isError } from "react-query";
import { Box, Button, Link,TextField, Typography } from "@mui/material";
import { sendPasswordReset } from "config/firebase";

import { AuthModalView } from "components/layout";

import "../auth.css";

interface ResetFormProps {
  openAuthModal: (value: AuthModalView) => void;
}

interface FormInput {
  email: string;
}


export const ResetForm = ({ openAuthModal }: ResetFormProps): JSX.Element => {
  const defaultValues = { email: "" };

  const onResetClick: SubmitHandler<FormInput> = async (data: FormInput) => {
    const response = await sendPasswordReset(data.email);

    if (isError(response)) {
      // TODO Display error message
    } else {
      openAuthModal(AuthModalView.Login);
    }
  };

  const { control, handleSubmit } = useForm<FormInput>({ defaultValues });

  return (
    <Box
      className='flex-center'
      flexDirection='column'
      paddingLeft={15}
      paddingRight={15}
      width='100%'
    >
      <form className='auth-form' onSubmit={handleSubmit(onResetClick)}>
        <Controller
          control={control}
          name='email'
          render={({ field: { onChange, value }, fieldState: { error } }): JSX.Element => (
            <TextField
              autoFocus
              className='text-input'
              error={!!error}
              fullWidth
              margin='normal'
              onChange={onChange}
              placeholder='Email'
              required
              type='email'
              value={value}
            />
          )}
        />
        <Button
          color='secondary'
          fullWidth
          sx={{ mt: 2, height: "3rem" }}
          type='submit'
          variant='contained'
        >
          <Typography textTransform='none' variant='h3'>Reset</Typography>
        </Button>
      </form>
      <Link
        onClick={(): void => openAuthModal(AuthModalView.Login)}
        sx={{ cursor: "pointer" }}
        underline='none'
      >
        <Typography color='black' sx={{ mt: 2 }} textAlign='center'>Return to Login</Typography>
      </Link>
    </Box>
  );
};
