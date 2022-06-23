import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Box,
  Button,
  Divider,
  Link,
  TextField,
  Typography
} from "@mui/material";
import { logInWithEmailAndPassword } from "config";
import { isError } from "lodash";

import { AuthModalView } from "components/layout";

import { FplIdLoginButton } from "./fpl_id_login_button";
import { GoogleLoginButton } from "./google_login_button";

import "../auth.css";

interface LoginFormProps {
  openAuthModal: (value: AuthModalView) => void;
  closeAuthModal: () => void;
}

interface FormInput {
  email: string;
  password: string;
}

export const LoginForm = ({ openAuthModal, closeAuthModal }: LoginFormProps): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState<string>("");

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleSubmit]);

  const onLoginClick: SubmitHandler<FormInput> = async (data: FormInput) => {
    const response = await logInWithEmailAndPassword(data.email, data.password);
    if (isError(response)) {
      setErrorMessage(response.message);
    } else {
      closeAuthModal();
    }
  };

  return (
    <Box
      className='flex-center'
      flexDirection='column'
      paddingLeft={15}
      paddingRight={15}
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
          <Typography textTransform='none' variant='h3'>Login</Typography>
        </Button>
      </form>
      <Link
        onClick={(): void => openAuthModal(AuthModalView.Reset)}
        sx={{ cursor: "pointer" }}
        underline='none'
      >
        <Typography color='black' sx={{ mt: 2 }}>Forgotten password?</Typography>
      </Link>
      <Divider sx={{ p: 3, width: "100%" }}><Typography variant='h4'>OR</Typography></Divider>
      <Box
        className='flex-center'
        flexDirection='column'
        gap={2}
        width='100%'
      >
        <GoogleLoginButton />
        <FplIdLoginButton openAuthModal={openAuthModal} />
        <Link
          onClick={(): void => openAuthModal(AuthModalView.Register)}
          sx={{ cursor: "pointer" }}
          underline='none'
        >
          <Typography color='black'>Don&apos;t have an account? Click to register.</Typography>
        </Link>
      </Box>
    </Box>
  );
};
