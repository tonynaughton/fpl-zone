import { Box, Button, TextField, Link as MuiLink } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import { auth, registerWithEmailAndPassword, signInWithGoogle } from "config/firebase";
import "./authentication.css";
import AuthLayout from "./auth_layout";

export default function Register(): JSX.Element {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [fplId, setFplId] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const register = () => {
    registerWithEmailAndPassword(firstName, lastName, email, password, fplId);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading, navigate]);

  return (
    <AuthLayout>
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
          onChange={(e) => setFirstName(e.target.value)}
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
          onChange={(e) => setLastName(e.target.value)}
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
          onChange={(e) => setEmail(e.target.value)}
        />
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
          onChange={(e) => setPassword(e.target.value)}
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
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
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
          onChange={(e) => setFplId(e.target.value)}
        />
        <Button
          sx={{ mt: 5 }}
          className="action-button"
          color="secondary"
          type="submit"
          fullWidth
          variant="contained"
          onClick={register}
        >
          Register
        </Button>
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
      </Box>
    </AuthLayout>
  );
}
