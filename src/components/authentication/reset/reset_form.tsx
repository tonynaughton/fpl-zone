import React, { useContext, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { isError } from "react-query";
import { Box, Button, Link,TextField, Typography } from "@mui/material";
import { sendPasswordReset } from "config";

import { AuthModalContext } from "components/layout";

import "../auth.css";

interface FormInput {
  email: string;
}


export const ResetForm = (): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { setAuthModalView } = useContext(AuthModalContext);

  const defaultValues = { email: "" };

  const onResetClick: SubmitHandler<FormInput> = async (data: FormInput) => {
    const response = await sendPasswordReset(data.email);

    if (isError(response)) {
      setErrorMessage(response.message);
    } else {
      setAuthModalView("login");
    }
  };

  const { control, handleSubmit } = useForm<FormInput>({ defaultValues });

  return (
    <Box
      className='flex-center'
      flexDirection='column'
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
        { errorMessage &&
          <Typography
            className='text-ellipsis'
            color='red'
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
          <Typography textTransform='none'>Reset</Typography>
        </Button>
      </form>
      <Link onClick={(): void => setAuthModalView("login")}>
        <Typography sx={{ mt: 2 }} textAlign='center'>Return to Login</Typography>
      </Link>
    </Box>
  );
};
