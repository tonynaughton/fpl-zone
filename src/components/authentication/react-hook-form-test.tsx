import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
  db,
  updateUserDetails,
} from "config/firebase";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Link as MuiLink } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
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

export default function ReactHookFormTest({ registerPage }: DetailsFormProps): JSX.Element {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  let defaultValues;

  const setDefaultValues = async (): Promise<Record<string, unknown>> => {
    let userData;
    if (user) {
      try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        userData = doc.docs[0].data();
      } catch (err) {
        alert("An error occured while fetching user data");
      }
    }
    return {
      firstName: userData?.firstName as string | "",
      lastName: userData?.lastName as string | "",
      email: userData?.email as string | "",
      password: "",
      repeatPassword: "",
      fplId: userData?.fplId as string | "",
    };
  };

  useEffect(() => {
    defaultValues = setDefaultValues();
    if (loading) return;
    if (registerPage && user) navigate("/dashboard");
  }, [loading, navigate, setDefaultValues, registerPage, user]);

  const { control, handleSubmit } = useForm<FormInput>({ defaultValues });

  const onDetailsSave: SubmitHandler<FormInput> = async (data: FormInput) => {
    if (!user) {
      await registerWithEmailAndPassword(
        data.firstName,
        data.lastName,
        data.email,
        data.password,
        data.fplId
      );
    } else {
      await updateUserDetails(user.uid, data.firstName, data.lastName, data.email, data.fplId);
    }
  };

  return (
    <Box component="div">
      <form onSubmit={handleSubmit(onDetailsSave)}>
        <Controller
          render={({ field: { onChange, value, onBlur } }): JSX.Element => (
            <TextField
              className="text-input"
              margin="normal"
              placeholder="First name"
              fullWidth
              autoFocus
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
          rules={{
            required: true,
          }}
          name="firstName"
          control={control}
        />
        <Controller
          render={({ field: { onChange, value, onBlur } }): JSX.Element => (
            <TextField
              className="text-input"
              margin="normal"
              placeholder="Last name"
              fullWidth
              autoFocus
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
          rules={{
            required: true,
          }}
          name="lastName"
          control={control}
        />
        <Controller
          render={({ field: { onChange, value, onBlur } }): JSX.Element => (
            <TextField
              className="text-input"
              margin="normal"
              placeholder="Email"
              fullWidth
              autoFocus
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
          rules={{
            required: true,
          }}
          name="email"
          control={control}
        />
        {registerPage && (
          <>
            <Controller
              render={({ field: { onChange, value, onBlur } }): JSX.Element => (
                <TextField
                  className="text-input"
                  margin="normal"
                  placeholder="Password"
                  fullWidth
                  autoFocus
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
              rules={{
                required: true,
              }}
              name="password"
              control={control}
            />
            <Controller
              render={({ field: { onChange, value, onBlur } }): JSX.Element => (
                <TextField
                  className="text-input"
                  margin="normal"
                  required
                  placeholder="Repeat password"
                  fullWidth
                  autoFocus
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
              name="repeatPassword"
              control={control}
            />
          </>
        )}
        <Controller
          render={({ field: { onChange, value, onBlur } }): JSX.Element => (
            <TextField
              className="text-input"
              margin="normal"
              placeholder="FPL ID (optional)"
              fullWidth
              autoFocus
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
          name="fplId"
          control={control}
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
    </Box>
  );
}
