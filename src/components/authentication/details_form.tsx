import React, { Fragment, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Controller,SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Info } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";
import {
  Alert,
  AlertColor,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link as MuiLink,
  Modal,
  OutlinedInput,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import {
  auth,
  db,
  registerWithEmailAndPassword,
  signInWithGoogle,
  updateUserDetails,
} from "config/firebase";
import { deleteUser } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { delay } from "helpers";

import { Notifier } from "components/layout";

import { FplIdModal } from ".";

import "./authentication.css";

interface DetailsFormProps {
  registerPage: boolean;
}

interface FormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
  fplId: string;
}

export const DetailsForm = ({ registerPage }: DetailsFormProps): JSX.Element => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
    fplId: "",
  };

  const [userData, setUserData] = useState(defaultValues);

  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  const [userFound, setUserFound] = useState(false);
  const [showFplIdModal, setShowFplIdModal] = useState(false);
  const [deleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false);

  const setSnackbar = (message: string, severity = "success"): void => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
    setSnackbarSeverity(severity);
  };

  const handleSnackbarClose = (): void => {
    setSnackbarOpen(false);
  };

  const setDefaultValues = async (): Promise<void> => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const userData = doc.docs[0].data();
      setUserData({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: "",
        repeatPassword: "",
        fplId: userData.fplId,
      });
      setUserFound(true);
    } catch (err) {
      alert("An error occured while fetching user data");
    }
  };

  const { control, handleSubmit, reset } = useForm<FormInput>({ defaultValues });

  useEffect(() => {
    if (loading) return;
    user && setDefaultValues();
    if (registerPage && user) navigate("/dashboard");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, navigate, registerPage, user]);

  useEffect(() => {
    reset(userData);
  }, [reset, userData]);

  const onDetailsSave: SubmitHandler<FormInput> = async (data: FormInput) => {
    if (data.password !== data.repeatPassword) {
      setSnackbar("Passwords don't match", "error");
      return;
    } else if (data.email)
      if (!user) {
        try {
          await registerWithEmailAndPassword(
            data.firstName,
            data.lastName,
            data.email,
            data.password,
            data.fplId
          ).catch((err) => setSnackbar("Registration failed: " + err, "error"));
          setSnackbar("Registration successful");
        } catch (err) {
          setSnackbar("Registration failed: " + err, "error");
        }
      } else {
        try {
          await updateUserDetails(
            user.uid,
            data.firstName,
            data.lastName,
            data.email,
            data.fplId
          ).catch((err) => {
            setSnackbar("Error updating details: " + err, "error");
          });
          setSnackbar("Details updated successfully");
        } catch (err) {
          setSnackbar("Error updating details: " + err, "error");
        }
      }
  };

  const handleDeleteAccountClick = async (): Promise<void> => {
    if (user) {
      await deleteUser(user);
      setSnackbar("Account deleted successfully");
      await delay(1000);
      navigate("/login");
    }
  };

  return (
    <Box component='div'>
      {!registerPage && !userFound ? (
        <Notifier message='Fetching user data..' />
      ) : (
        <>
          <form onSubmit={handleSubmit(onDetailsSave)}>
            <Controller
              name='firstName'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }): JSX.Element => (
                <TextField
                  className='text-input'
                  margin='normal'
                  placeholder='First name'
                  fullWidth
                  error={!!error}
                  required
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <Controller
              name='lastName'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }): JSX.Element => (
                <TextField
                  className='text-input'
                  margin='normal'
                  placeholder='Last name'
                  fullWidth
                  error={!!error}
                  required
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <Controller
              name='email'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }): JSX.Element => (
                <TextField
                  className='text-input'
                  margin='normal'
                  placeholder='Email'
                  fullWidth
                  error={!!error}
                  required
                  value={value}
                  onChange={onChange}
                  type='email'
                />
              )}
            />
            {registerPage && (
              <>
                <Controller
                  name='password'
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }): JSX.Element => (
                    <TextField
                      sx={{ mt: 2 }}
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
                <Controller
                  name='repeatPassword'
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }): JSX.Element => (
                    <TextField
                      sx={{ mt: 1 }}
                      className='text-input'
                      placeholder='Repeat password'
                      fullWidth
                      error={!!error}
                      required
                      value={value}
                      onChange={onChange}
                      type='password'
                      inputProps={{ form: { autoComplete: "off" } }}
                    />
                  )}
                />
              </>
            )}
            <Controller
              name='fplId'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }): JSX.Element => (
                <OutlinedInput
                  sx={{ mt: 2 }}
                  className='text-input'
                  placeholder='FPL ID (optional)'
                  fullWidth
                  error={!!error}
                  value={value}
                  onChange={onChange}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='show fpl id modal'
                        onClick={(): void => setShowFplIdModal(true)}
                        onMouseDown={(event): void => event.preventDefault()}
                        edge='end'
                      >
                        <Info />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              )}
            />
            <Button
              sx={{ mt: 5 }}
              className='action-button'
              color='secondary'
              type='submit'
              fullWidth
              variant='contained'
            >
              {registerPage ? "Register" : "Update"}
            </Button>
            {!registerPage && (
              <Button
                sx={{ mt: 3 }}
                className='action-button'
                color='error'
                fullWidth
                variant='contained'
                onClick={(): void => setDeleteAccountModalOpen(true)}
              >
                {"Delete Account"}
              </Button>
            )}
          </form>
          {registerPage && (
            <>
              <Button
                color='info'
                onClick={signInWithGoogle}
                sx={{ mt: 2 }}
                className='action-button google-login'
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
                href='/login'
                display='block'
                className='auth-link'
              >
                Already have an account? Login now.
              </MuiLink>
            </>
          )}
        </>
      )}
      <FplIdModal modalVisible={showFplIdModal} setModalOpen={setShowFplIdModal} />
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
      <Modal open={deleteAccountModalOpen} onClose={(): void => setDeleteAccountModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            bgcolor: "#F9F9F9",
            border: "2px solid black",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography sx={{ fontSize: "1.2em" }}>
            Are you sure you want to delete your account?
          </Typography>
          <Box sx={{ pt: 2, display: "flex", justifyContent: "flex-end", width: "100%" }}>
            <Button onClick={handleDeleteAccountClick}>
              <Typography sx={{ fontSize: "1.2em" }}>Confirm</Typography>
            </Button>
            <Button onClick={(): void => setDeleteAccountModalOpen(false)}>
              <Typography sx={{ fontSize: "1.2em" }}>Cancel</Typography>
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};
