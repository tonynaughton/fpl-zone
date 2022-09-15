import React, { useContext, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Box,
  Button,
  Divider,
  Link,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import { logInWithEmailAndPassword } from "config";
import { isError } from "lodash";

import { AuthModalContext } from "components/layout";

import { FplIdLoginButton } from "./fpl_id_login_button";
import { GoogleLoginButton } from "./google_login_button";

import "../auth.css";

interface FormInput {
  email: string;
  password: string;
}

export const LoginForm = (): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { setAuthModalView } = useContext(AuthModalContext);
  const theme = useTheme();

  const defaultValues = {
    email: "",
    password: ""
  };

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
    const response = await logInWithEmailAndPassword(data.email, data.password);
    if (isError(response)) {
      setErrorMessage(response.message);
    } else {
      setAuthModalView("none");
    }
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
          name='email'
          render={({ field: { onChange, value }, fieldState: { error } }): JSX.Element => (
            <TextField
              autoFocus
              error={!!error}
              fullWidth
              margin='dense'
              onChange={onChange}
              placeholder='Email'
              required
              type='email'
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name='password'
          render={({ field: { onChange, value }, fieldState: { error } }): JSX.Element => (
            <TextField
              error={!!error}
              fullWidth
              margin='dense'
              onChange={onChange}
              placeholder='Password'
              required
              type='password'
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
          <Typography textTransform='none'>Login</Typography>
        </Button>
      </form>
      <Link onClick={(): void => setAuthModalView("reset")}>
        <Typography sx={{ mt: 2 }}>Forgotten password?</Typography>
      </Link>
      <Divider sx={{ p: 3, width: "100%" }}><Typography variant='h4'>OR</Typography></Divider>
      <Box
        className='flex-center'
        flexDirection='column'
        gap={2}
        width='100%'
      >
        <GoogleLoginButton />
        <FplIdLoginButton />
        <Link onClick={(): void => setAuthModalView("register")} >
          <Typography textAlign='center' >Don&apos;t have an account? Click to register.</Typography>
        </Link>
      </Box>
    </Box>
  );
};
