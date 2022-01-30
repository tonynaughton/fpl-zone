import { Box, Button, Container, Grid, TextField, Typography, Paper } from "@mui/material";
import React, { Component } from "react";
import "./authentication.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export class Register extends Component {
  public handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  public render(): JSX.Element {
    return (
      <>
        <Button
          href="/login"
          size="large"
          color="info"
          variant="contained"
          startIcon={<ArrowBackIcon />}
          sx={{ position: "absolute", top: 50, left: 50 }}
        >
          Login
        </Button>
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
            <Box component="form" onClick={this.handleSubmit} className="auth-form" noValidate>
              <TextField
                className="text-input"
                margin="normal"
                id="first-name"
                required
                name="first-name"
                placeholder="First name"
                fullWidth
                autoFocus
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
              />
              <TextField
                sx={{ mt: 5 }}
                className="text-input"
                margin="normal"
                id="email"
                required
                name="email"
                autoComplete="email"
                placeholder="Email"
                fullWidth
                autoFocus
              />
              <TextField
                sx={{ mt: 5 }}
                className="text-input"
                margin="normal"
                id="password"
                required
                name="password"
                autoComplete="current-password"
                placeholder="Password"
                type="password"
                fullWidth
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
              />
              <TextField
                sx={{ mt: 5 }}
                className="text-input"
                margin="normal"
                id="fpl-id"
                required
                name="fpl-id"
                placeholder="FPL ID (optional)"
                fullWidth
                autoFocus
              />
              <Button
                sx={{ mt: 5 }}
                className="action-button"
                color="secondary"
                type="submit"
                fullWidth
                variant="contained"
              >
                Register
              </Button>
            </Box>
          </Container>
        </Box>
      </>
    );
  }
}
