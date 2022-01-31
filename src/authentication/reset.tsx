import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, sendPasswordReset } from "../config/firebase";
import "./authentication.css";

export default function Reset() {
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
        <Grid container spacing="10" alignItems="center">
          <Grid item>
            <img
              className="football-icon"
              alt="logo"
              src={`${process.env.PUBLIC_URL}/assets/images/football.png`}
            />
          </Grid>
          <Grid item>
            <Typography component="h1" variant="h1" textAlign="center">
              FPL ZONE
            </Typography>
          </Grid>
        </Grid>
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
