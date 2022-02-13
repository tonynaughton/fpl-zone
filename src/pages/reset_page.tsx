import { Box, Button, TextField, Link as MuiLink } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, sendPasswordReset } from "config/firebase";
import AuthLayout from "../components/authentication/auth_layout";

export default function ResetPage(): JSX.Element {
  const [email, setEmail] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

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
        <Button
          onClick={(): Promise<void> => sendPasswordReset(email)}
          sx={{ mt: 2 }}
          className="action-button"
          color="secondary"
          fullWidth
          variant="contained"
        >
          Send password reset email
        </Button>
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
