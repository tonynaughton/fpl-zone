import React, { useState } from "react";
import { Controller,SubmitHandler, useForm } from "react-hook-form";
import { Info } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  OutlinedInput,
  TextField,
  Typography
} from "@mui/material";
import {
  registerWithEmailAndPassword
} from "config/firebase";
import { isError } from "lodash";

import { AuthModalView } from "components/layout";

import "../auth.css";

interface RegisterFormProps {
  openAuthModal: (value: AuthModalView) => void;
  closeAuthModal: () => void;
}

interface FormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
  fplId: string;
}

export const RegisterForm = ({ openAuthModal, closeAuthModal }: RegisterFormProps): JSX.Element => {
  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
    fplId: ""
  };

  const [showFplIdDrawer, setShowFplIdDrawer] = useState(false);

  const { control, handleSubmit } = useForm<FormInput>({ defaultValues });

  const onRegisterClick: SubmitHandler<FormInput> = async (data: FormInput) => {
    if (data.password !== data.repeatPassword) {
      return;
    }

    const response = await registerWithEmailAndPassword(
      data.firstName,
      data.lastName,
      data.email,
      data.password,
      data.fplId
    );
    if (isError(response)) {
      // TODO Display error message
    } else {
      closeAuthModal();
    }
  };

  return (
    <Box
      className='flex-center'
      flexDirection='column'
      paddingLeft={15}
      paddingRight={15}
      width='100%'
    >
      <form className='auth-form' onSubmit={handleSubmit(onRegisterClick)}>
        <Controller
          control={control}
          name='firstName'
          render={({ field: { onChange, value }, fieldState: { error } }): JSX.Element => (
            <TextField
              autoFocus
              error={!!error}
              fullWidth
              margin='normal'
              onChange={onChange}
              placeholder='First name'
              required
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name='lastName'
          render={({ field: { onChange, value }, fieldState: { error } }): JSX.Element => (
            <TextField
              error={!!error}
              fullWidth
              margin='normal'
              onChange={onChange}
              placeholder='Last name'
              required
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name='email'
          render={({ field: { onChange, value }, fieldState: { error } }): JSX.Element => (
            <TextField
              className='text-input'
              error={!!error}
              fullWidth
              margin='normal'
              onChange={onChange}
              placeholder='Email'
              required
              type='email'
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name='password'
          render={({ field: { onChange, value }, fieldState: { error } }): JSX.Element => (
            <TextField
              autoFocus
              error={!!error}
              fullWidth
              onChange={onChange}
              placeholder='Password'
              required
              type='password'
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name='repeatPassword'
          render={({ field: { onChange, value }, fieldState: { error } }): JSX.Element => (
            <TextField
              error={!!error}
              fullWidth
              inputProps={{ form: { autoComplete: "off" } }}
              margin='normal'
              onChange={onChange}
              placeholder='Repeat password'
              required
              type='password'
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name='fplId'
          render={({ field: { onChange, value }, fieldState: { error } }): JSX.Element => (
            <OutlinedInput
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='show fpl id modal'
                    edge='end'
                    onClick={(): void => setShowFplIdDrawer(true)}
                    onMouseDown={(event): void => event.preventDefault()}
                  >
                    <Info />
                  </IconButton>
                </InputAdornment>
              }
              error={!!error}
              fullWidth
              onChange={onChange}
              placeholder='FPL ID (optional)'
              sx={{ mt: 1 }}
              value={value}
            />
          )}
        />
        <Button
          color='secondary'
          fullWidth
          sx={{ mt: 2, height: "3rem" }}
          type='submit'
          variant='contained'
        >
          <Typography textTransform='none' variant='h3'>Register</Typography>
        </Button>
      </form>
      <Link
        onClick={(): void => openAuthModal(AuthModalView.Login)}
        sx={{ cursor: "pointer" }}
        underline='none'
      >
        <Typography color='black' sx={{ mt: 2 }} textAlign='center'>Already have an account? Login now.</Typography>
      </Link>
    </Box>
  );
};
