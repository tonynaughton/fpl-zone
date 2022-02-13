import { Box, Button, TextField, Link as MuiLink } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "config/firebase";
import GoogleIcon from "@mui/icons-material/Google";
import { useAuthState } from "react-firebase-hooks/auth";
import AuthLayout from "./auth_layout";

export default function LoginForm(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/gameweek-live");
    const listener = (event: { code: string; preventDefault: () => void }): void => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        logInWithEmailAndPassword(email, password);
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [user, loading, navigate, email, password]);

  return (
    <AuthLayout>
      <Box component="div">
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
        <Button
          onClick={(): Promise<void> => logInWithEmailAndPassword(email, password)}
          sx={{ mt: 2, fontSize: "1.8em", textTransform: "none" }}
          color="secondary"
          fullWidth
          variant="contained"
          type="submit"
        >
          Login
        </Button>
        <Button
          color="info"
          onClick={signInWithGoogle}
          sx={{ mt: 2, fontSize: "1.8em", textTransform: "none" }}
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
          href="/reset"
          display="block"
          className="auth-link"
        >
          Forgot Password?
        </MuiLink>
        <MuiLink
          textAlign="center"
          color="black"
          component="a"
          underline="none"
          href="/register"
          display="block"
          className="auth-link"
        >
          Don&apos;t have an account? Click to register.
        </MuiLink>
      </Box>
    </AuthLayout>
  );
}
