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
} from "@mui/material";
import { auth, sendPasswordReset } from "config/firebase";
import { delay } from "helpers";

import { AuthLayout } from "../components/authentication";

interface FormInput {
  email: string;
}

export function ResetPage(): JSX.Element {
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
    email: "",
  };

  const { control, handleSubmit } = useForm<FormInput>({ defaultValues });

  const onSendPasswordReset = async (data: FormInput): Promise<void> => {
    try {
      await sendPasswordReset(data.email).catch((err) => {
        setSnackbar("Error: " + err);
        return;
      });
      setSnackbar("Password reset email sent");
      await delay(1500);
      navigate("/login");
    } catch (err) {
      setSnackbar("Cannot send password reset email: " + err, "error");
    }
  };

  return (
    <AuthLayout>
      <Box component='div'>
        <form onSubmit={handleSubmit(onSendPasswordReset)}>
          <Controller
            name='email'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }): JSX.Element => {
              return (
                <TextField
                  className='text-input'
                  margin='normal'
                  required
                  placeholder='Email'
                  fullWidth
                  error={!!error}
                  autoFocus
                  value={value}
                  onChange={onChange}
                />
              );
            }}
          />
          <Button
            sx={{ mt: 5 }}
            className='action-button'
            color='secondary'
            type='submit'
            fullWidth
            variant='contained'
          >
            Send password reset email
          </Button>
        </form>
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
