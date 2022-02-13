import { Box, Button, TextField, Link as MuiLink } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
  db,
  updateUserDetails,
} from "config/firebase";
import "./authentication.css";
import { collection, getDocs, query, where } from "firebase/firestore";

interface DetailsFormProps {
  registerPage: boolean;
}

export default function DetailsForm({ registerPage }: DetailsFormProps): JSX.Element {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [fplId, setFplId] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const setExistingDetails = async (): Promise<void> => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email);
      setFplId(data.fplId);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  const onDetailsSave = async (): Promise<void> => {
    if (!user) {
      await registerWithEmailAndPassword(firstName, lastName, email, password, fplId);
    } else {
      await updateUserDetails(user.uid, firstName, lastName, email, fplId);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (registerPage && user) navigate("/dashboard");
    if (user) setExistingDetails();
    const listener = (event: { code: string; preventDefault: () => void }): void => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        onDetailsSave();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, navigate, onDetailsSave, registerPage, user]);

  return (
    <Box component="div">
      <TextField
        className="text-input"
        margin="normal"
        id="first-name"
        required
        name="first-name"
        placeholder="First name"
        fullWidth
        autoFocus
        value={firstName}
        onChange={(e): void => setFirstName(e.target.value)}
      />
      <TextField
        className="text-input"
        margin="normal"
        id="last-name"
        required
        name="last-name"
        placeholder="Last name"
        fullWidth
        autoFocus
        value={lastName}
        onChange={(e): void => setLastName(e.target.value)}
      />
      <TextField
        className="text-input"
        margin="normal"
        id="email"
        required
        name="email"
        autoComplete="email"
        placeholder="Email"
        fullWidth
        autoFocus
        value={email}
        onChange={(e): void => setEmail(e.target.value)}
      />
      {registerPage && (
        <>
          <TextField
            className="text-input"
            margin="normal"
            id="password"
            required
            name="password"
            autoComplete="current-password"
            placeholder="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e): void => setPassword(e.target.value)}
          />
          <TextField
            className="text-input"
            margin="normal"
            id="repeat-password"
            required
            name="repeat-password"
            placeholder="Repeat password"
            type="password"
            fullWidth
            value={repeatPassword}
            onChange={(e): void => setRepeatPassword(e.target.value)}
          />
        </>
      )}
      <TextField
        className="text-input"
        margin="normal"
        id="fpl-id"
        required
        name="fpl-id"
        placeholder="FPL ID (optional)"
        fullWidth
        autoFocus
        value={fplId}
        onChange={(e): void => setFplId(e.target.value)}
      />
      <Button
        sx={{ mt: 5 }}
        className="action-button"
        color="secondary"
        type="submit"
        fullWidth
        variant="contained"
        onClick={onDetailsSave}
      >
        {registerPage ? "Register" : "Update"}
      </Button>
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
