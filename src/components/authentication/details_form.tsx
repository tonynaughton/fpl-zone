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
  Typography
} from "@mui/material";
import {
  auth,
  db,
  registerWithEmailAndPassword,
  signInWithGoogle,
  updateUserDetails
} from "config/firebase";
import { deleteUser } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { delay } from "helpers";

import { Notifier } from "components/layout";

import { FplIdModal } from ".";

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
    fplId: ""
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
        fplId: userData.fplId
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

    } else if (data.email) if (!user) {
      try {
        await registerWithEmailAndPassword(
          data.firstName,
          data.lastName,
          data.email,
          data.password,
          data.fplId
        ).catch((err) => setSnackbar(`Registration failed: ${err}`, "error"));
        setSnackbar("Registration successful");
      } catch (err) {
        setSnackbar(`Registration failed: ${err}`, "error");
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
          setSnackbar(`Error updating details: ${err}`, "error");
        });
        setSnackbar("Details updated successfully");
      } catch (err) {
        setSnackbar(`Error updating details: ${err}`, "error");
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
      {!registerPage && !userFound
        ? (
          <Notifier message='Fetching user data..' />
        )
        : (
          <>
            <form onSubmit={handleSubmit(onDetailsSave)}>
              <Controller
                control={control}
                name='firstName'
                render={({ field: { onChange, value }, fieldState: { error } }): JSX.Element => (
                  <TextField
                    error={!!error}
                    fullWidth
                    margin='dense'
                    onChange={onChange}
                    placeholder='First name'
                    required
                    size='small'
                    sx={{ mt: 2 }}
                    value={value}
                  />
                )}
              />
              <Controller
                control={control}
                name='lastName'
                render={({ field: { onChange, value }, fieldState: { error } }): JSX.Element => (
                  <TextField
                    error={!!error}
                    fullWidth
                    margin='dense'
                    onChange={onChange}
                    placeholder='Last name'
                    required
                    size='small'
                    value={value}
                  />
                )}
              />
              <Controller
                control={control}
                name='email'
                render={({ field: { onChange, value }, fieldState: { error } }): JSX.Element => (
                  <TextField
                    className='text-input'
                    error={!!error}
                    fullWidth
                    margin='dense'
                    onChange={onChange}
                    placeholder='Email'
                    required
                    size='small'
                    type='email'
                    value={value}
                  />
                )}
              />
              {registerPage && (
                <>
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
                        size='small'
                        type='password'
                        value={value}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name='repeatPassword'
                    render={({ field: { onChange, value }, fieldState: { error } }): JSX.Element => (
                      <TextField
                        error={!!error}
                        fullWidth
                        inputProps={{ form: { autoComplete: "off" } }}
                        margin='dense'
                        onChange={onChange}
                        placeholder='Repeat password'
                        required
                        size='small'
                        type='password'
                        value={value}
                      />
                    )}
                  />
                </>
              )}
              <Controller
                control={control}
                name='fplId'
                render={({ field: { onChange, value }, fieldState: { error } }): JSX.Element => (
                  <OutlinedInput
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='show fpl id modal'
                          edge='end'
                          onClick={(): void => setShowFplIdModal(true)}
                          onMouseDown={(event): void => event.preventDefault()}
                        >
                          <Info />
                        </IconButton>
                      </InputAdornment>
                    }
                    error={!!error}
                    fullWidth
                    onChange={onChange}
                    placeholder='FPL ID (optional)'
                    size='small'
                    sx={{ mt: 1 }}
                    value={value}
                  />
                )}
              />
              <Button
                className='action-button'
                color='secondary'
                fullWidth
                sx={{ mt: 2 }}
                type='submit'
                variant='contained'
              >
                <Typography textTransform='none' variant='h3'>
                  {registerPage ? "Register" : "Update"}
                </Typography>
              </Button>
              {!registerPage && (
                <Button
                  className='action-button'
                  color='error'
                  fullWidth
                  onClick={(): void => setDeleteAccountModalOpen(true)}
                  variant='contained'
                >
                  Delete Account
                </Button>
              )}
            </form>
            {registerPage && (
              <>
                <Button
                  className='action-button google-login'
                  color='info'
                  fullWidth
                  onClick={signInWithGoogle}
                  sx={{ mt: 2 }}
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
                  href='/login'
                  marginTop={2}
                  sx={{ "&:hover": { color: "white" } }}
                  textAlign='center'
                  underline='none'
                  variant='body1'
                >
                Already have an account? Login now.
                </MuiLink>
              </>
            )}
          </>
        )}
      <FplIdModal modalVisible={showFplIdModal} setModalOpen={setShowFplIdModal} />
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
      <Modal onClose={(): void => setDeleteAccountModalOpen(false)} open={deleteAccountModalOpen}>
        <Box
          border='1px solid black'
          boxShadow={24}
          display='flex'
          flexDirection='column'
          left='50%'
          padding={4}
          position='absolute'
          sx={{
            transform: "translate(-50%, -50%)",
            bgcolor: "#F9F9F9"
          }}
          top='50%'
          width='50%'
        >
          <Typography>
            Are you sure you want to delete your account?
          </Typography>
          <Box
            display='flex'
            justifyContent='flex-end'
            paddingTop={2}
            width='100%'
          >
            <Button onClick={handleDeleteAccountClick}>
              <Typography>Confirm</Typography>
            </Button>
            <Button onClick={(): void => setDeleteAccountModalOpen(false)}>
              <Typography>Cancel</Typography>
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};
