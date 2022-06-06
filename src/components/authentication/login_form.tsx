import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import {
  Alert,
  AlertColor,
  Box,
  Button,
  Link as MuiLink,
  Snackbar,
  TextField,
} from "@mui/material";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "config/firebase";
import { FirebaseResponse } from "types/firebase";

import { AuthLayout } from ".";

interface FormInput {
  email: string;
  password: string;
}

export function LoginForm(): JSX.Element {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const defaultValues = {
    email: "",
    password: "",
  };

  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");

  const setSnackbar = (message: string, severity = "info"): void => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
    setSnackbarSeverity(severity);
  };

  const handleSnackbarClose = (): void => {
    setSnackbarOpen(false);
  };

  const { control, handleSubmit } = useForm<FormInput>({ defaultValues });

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/gameweek-live");
    const listener = (event: { code: string; preventDefault: () => void }): void => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        // https://github.com/react-hook-form/react-hook-form/issues/936#issuecomment-580103981
        handleSubmit(onLoginClick)();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading, navigate, handleSubmit]);

  const onLoginClick: SubmitHandler<FormInput> = async (data: FormInput) => {
    try {
      const response = (await logInWithEmailAndPassword(
        data.email,
        data.password
      )) as FirebaseResponse;
      setSnackbar("Registration failed: " + response.message, "error");
    } catch (err) {
      setSnackbar("Registration failed: " + err, "warning");
    }
  };

  return (
    <AuthLayout>
      <Box component='div'>
        <form onSubmit={handleSubmit(onLoginClick)}>
          <Controller
            name='email'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }): JSX.Element => (
              <TextField
                autoFocus
                className='text-input'
                margin='normal'
                placeholder='Email'
                required
                fullWidth
                error={!!error}
                value={value}
                onChange={onChange}
                type='email'
              />
            )}
          />
          <Controller
            name='password'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }): JSX.Element => (
              <TextField
                sx={{ mt: 2 }}
                autoFocus
                className='text-input'
                placeholder='Password'
                fullWidth
                error={!!error}
                required
                value={value}
                onChange={onChange}
                type='password'
              />
            )}
          />
          <Button
            sx={{ mt: 2, fontSize: "1.8em", textTransform: "none" }}
            color='secondary'
            fullWidth
            variant='contained'
            type='submit'
          >
            Login
          </Button>
        </form>
        <Button
          color='info'
          onClick={signInWithGoogle}
          sx={{ mt: 2, fontSize: "1.8em", textTransform: "none" }}
          fullWidth
          variant='contained'
        >
          <GoogleIcon sx={{ mr: 2 }} />
          Login with Google
        </Button>
        <MuiLink
          textAlign='center'
          color='black'
          component='a'
          underline='none'
          href='/reset'
          display='block'
          className='auth-link'
        >
          Forgot Password?
        </MuiLink>
        <MuiLink
          textAlign='center'
          color='black'
          component='a'
          underline='none'
          href='/register'
          display='block'
          className='auth-link'
        >
          Don&apos;t have an account? Click to register.
        </MuiLink>
        <Snackbar
          autoHideDuration={6000}
          open={snackbarOpen}
          onClose={handleSnackbarClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity as AlertColor}
            elevation={6}
            variant='filled'
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </AuthLayout>
  );
}
