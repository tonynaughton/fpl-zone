import React, { useEffect, useState } from "react";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
  db,
  updateUserDetails,
} from "config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Link as MuiLink,
  Snackbar,
  Alert,
  AlertColor,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import "./authentication.css";
import Loading from "components/layout/loading";

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

export default function ReactHookFormTest({ registerPage }: DetailsFormProps): JSX.Element {
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

  const setSnackbar = (message: string, severity = "info"): void => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
    setSnackbarSeverity(severity);
  };

  const handleClose = (): void => {
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
    if (!user) {
      try {
        await registerWithEmailAndPassword(
          data.firstName,
          data.lastName,
          data.email,
          data.password,
          data.fplId
        ).then(() => {
          setSnackbar("Registration successful", "success");
        });
      } catch (err) {
        setSnackbar("Registration failed: " + err, "warning");
      }
    } else {
      await updateUserDetails(user.uid, data.firstName, data.lastName, data.email, data.fplId).then(
        () => {
          setSnackbar("Details updated successfully", "success");
        }
      );
    }
  };

  return (
    <Box component="div">
      {!registerPage && !userFound ? (
        <Loading message="Fetching user data.." />
      ) : (
        <>
          <form onSubmit={handleSubmit(onDetailsSave)}>
            <Controller
              name="firstName"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value }, fieldState: { error } }): JSX.Element => (
                <TextField
                  className="text-input"
                  margin="normal"
                  placeholder="First name"
                  fullWidth
                  error={!!error}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value }, fieldState: { error } }): JSX.Element => (
                <TextField
                  className="text-input"
                  margin="normal"
                  placeholder="Last name"
                  fullWidth
                  error={!!error}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value }, fieldState: { error } }): JSX.Element => (
                <TextField
                  className="text-input"
                  margin="normal"
                  placeholder="Email"
                  fullWidth
                  error={!!error}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            {registerPage && (
              <>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value }, fieldState: { error } }): JSX.Element => (
                    <TextField
                      className="text-input"
                      margin="normal"
                      placeholder="Password"
                      fullWidth
                      error={!!error}
                      value={value}
                      onChange={onChange}
                      type="password"
                      inputProps={{ form: { autoComplete: "off" } }}
                    />
                  )}
                />
                <Controller
                  name="repeatPassword"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value }, fieldState: { error } }): JSX.Element => (
                    <TextField
                      className="text-input"
                      margin="normal"
                      placeholder="Repeat password"
                      fullWidth
                      error={!!error}
                      value={value}
                      onChange={onChange}
                      type="password"
                      inputProps={{ form: { autoComplete: "off" } }}
                    />
                  )}
                />
              </>
            )}
            <Controller
              name="fplId"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }): JSX.Element => (
                <TextField
                  className="text-input"
                  margin="normal"
                  placeholder="FPL ID (optional)"
                  fullWidth
                  error={!!error}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <Button
              sx={{ mt: 5 }}
              className="action-button"
              color="secondary"
              type="submit"
              fullWidth
              variant="contained"
            >
              {registerPage ? "Register" : "Update"}
            </Button>
          </form>
          {registerPage && (
            <>
              <Button
                color="info"
                onClick={signInWithGoogle}
                sx={{ mt: 2 }}
                className="action-button google-login"
                fullWidth
                variant="contained"
              >
                <GoogleIcon sx={{ mr: 2 }} />
                Login with Google
              </Button>
              <MuiLink
                textAlign="center"
                color="black"
                component="a"
                underline="none"
                href="/login"
                display="block"
                className="auth-link"
              >
                Already have an account? Login now.
              </MuiLink>
            </>
          )}
        </>
      )}
      <Snackbar
        autoHideDuration={6000}
        open={snackbarOpen}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbarSeverity as AlertColor}
          elevation={6}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
