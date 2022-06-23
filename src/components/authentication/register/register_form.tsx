import React, { useState } from "react";
import { Controller,SubmitHandler, useForm } from "react-hook-form";
import {
  Box,
  Button,
  Link,
  OutlinedInput,
  TextField,
  Typography
} from "@mui/material";
import {
  registerWithEmailAndPassword
} from "config";
import { isError } from "lodash";

import { AuthModalView } from "components/layout";

import { FplIdPopover } from "../fpl_id_popover";

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
  const [errorMessage, setErrorMessage] = useState<string>("");

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
    fplId: ""
  };

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
      setErrorMessage(response.message);
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
              margin='dense'
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
              margin='dense'
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
              margin='dense'
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
              error={!!error}
              fullWidth
              margin='dense'
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
              margin='dense'
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
              endAdornment={<FplIdPopover />}
              error={!!error}
              fullWidth
              onChange={onChange}
              placeholder='FPL ID'
              sx={{
                mt: 1,
                "& input[type=number]": {
                  MozAppearance: "textfield"
                },
                "& input[type=number]::-webkit-outer-spin-button": {
                  WebkitAppearance: "none",
                  margin: 0
                },
                "& input[type=number]::-webkit-inner-spin-button": {
                  WebkitAppearance: "none",
                  margin: 0
                }
              }}
              type='number'
              value={value}
            />
          )}
        />
        { errorMessage &&
          <Typography
            className='text-ellipsis'
            color='red'
            marginTop={2}
            textAlign='center'
          >{errorMessage}
          </Typography>}
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
