import { Box, Button, Container, TextField, Link as MuiLink } from "@mui/material";
import Logo from "components/logo/logo";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, sendPasswordReset } from "config/firebase";
import "./authentication.css";

export default function Reset(): JSX.Element {
  const [email, setEmail] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading, navigate]);

  return (
    <Box
      className="auth-view"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Container component="main" maxWidth="sm">
        <Logo />
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
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            onClick={() => sendPasswordReset(email)}
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
      </Container>
    </Box>
  );
}
