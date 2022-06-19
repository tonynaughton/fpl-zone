import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
import { auth, sendPasswordReset } from "config/firebase";
import { delay } from "helpers";

import { AuthLayout } from "../components/authentication";

interface FormInput {
  email: string;
}

export const ResetPage = (): JSX.Element => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading, navigate]);

  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");

  const setSnackbar = (message: string, severity = "success"): void => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
    setSnackbarSeverity(severity);
  };

  const handleSnackbarClose = (): void => {
    setSnackbarOpen(false);
  };

  const defaultValues = {
    email: ""
  };

  const { control, handleSubmit } = useForm<FormInput>({ defaultValues });

  const onSendPasswordReset = async (data: FormInput): Promise<void> => {
    try {
      await sendPasswordReset(data.email).catch((err) => {
        setSnackbar(`Error: ${err}`);

      });
      setSnackbar("Password reset email sent");
      await delay(1500);
      navigate("/login");
    } catch (err) {
      setSnackbar(`Cannot send password reset email: ${err}`, "error");
    }
  };

  return (
    <AuthLayout>
      <Box component='div'>
        <form onSubmit={handleSubmit(onSendPasswordReset)}>
          <Controller
            control={control}
            name='email'
            render={({ field: { onChange, value }, fieldState: { error } }): JSX.Element => {
              return (
                <TextField
                  autoFocus
                  className='text-input'
                  error={!!error}
                  fullWidth
                  margin='dense'
                  onChange={onChange}
                  placeholder='Email'
                  required
                  size='small'
                  value={value}
                />
              );
            }}
          />
          <Button
            className='action-button'
            color='secondary'
            fullWidth
            type='submit'
            variant='contained'
          >
            <Typography textTransform='none' variant='h3'>Send password reset email</Typography>
          </Button>
        </form>
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
