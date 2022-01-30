import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import React, { Component } from "react";
import "./login.css";

export class Login extends Component {
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
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
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
          <Box component="form" onClick={this.handleSubmit} className="login-form" noValidate>
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
            />
            <Button
              sx={{ mt: 2 }}
              className="action-button"
              color="secondary"
              type="submit"
              fullWidth
              variant="contained"
            >
              Login
            </Button>
            <Typography sx={{ mt: 6 }} fontSize="1.5em" textAlign="center" component="p">
              Don&apos;t have an account?
            </Typography>
            <Button
              sx={{ mt: 1 }}
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
    );
  }
}
