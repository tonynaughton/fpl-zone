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
  Typography
} from "@mui/material";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "config/firebase";
import { FirebaseResponse } from "types/firebase";

import { AuthLayout } from ".";

interface FormInput {
  email: string;
  password: string;
}

export const LoginForm = (): JSX.Element => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const defaultValues = {
    email: "",
    password: ""
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
      setSnackbar(`Registration failed: ${response.message}`, "error");
    } catch (err) {
      setSnackbar(`Registration failed: ${err}`, "warning");
    }
  };

  return (
    <AuthLayout>
      <Box component='div'>
        <form onSubmit={handleSubmit(onLoginClick)}>
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
                size='small'
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
                autoFocus
                className='text-input'
                error={!!error}
                fullWidth
                onChange={onChange}
                placeholder='Password'
                required
                size='small'
                type='password'
                value={value}
              />
            )}
          />
          <Button
            color='secondary'
            fullWidth
            sx={{ mt: 2 }}
            type='submit'
            variant='contained'
          >
            <Typography textTransform='none' variant='h3'>Login</Typography>
          </Button>
        </form>
        <Button
          color='info'
          fullWidth
          onClick={signInWithGoogle}
          sx={{ mt: 2, fontSize: "1.8em", textTransform: "none" }}
          variant='contained'
        >
          <GoogleIcon sx={{ mr: 2 }} />
          <Typography textTransform='none' variant='h3'>Login with Google</Typography>
        </Button>
        <MuiLink
          className='auth-link'
          color='black'
          component='a'
          display='block'
          href='/reset'
          marginTop={2}
          sx={{ "&:hover": { color: "white" } }}
          textAlign='center'
          underline='none'
        >
          Forgot Password?
        </MuiLink>
        <MuiLink
          className='auth-link'
          color='black'
          component='a'
          display='block'
          href='/register'
          marginTop={2}
          sx={{ "&:hover": { color: "white" } }}
          textAlign='center'
          underline='none'
        >
          Don&apos;t have an account? Click to register.
        </MuiLink>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          open={snackbarOpen}
        >
          <Alert
            elevation={6}
            onClose={handleSnackbarClose}
            severity={snackbarSeverity as AlertColor}
            variant='filled'
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </AuthLayout>
  );
};
