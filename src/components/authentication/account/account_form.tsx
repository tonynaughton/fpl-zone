
import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Controller,SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  OutlinedInput,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import {
  auth,
  getUserDetails,
  updateUserDetails
} from "config";
import { isError } from "lodash";

import { AuthModalContext } from "components/layout";

import { FplIdPopover } from "../fpl_id_popover";

interface FormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
  fplId: string;
}

type DefaultFormValues = Omit<FormInput, "password" | "repeatPassword">;

export const AccountForm = (): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { setAuthModalView } = useContext(AuthModalContext);
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const theme = useTheme();

  const [defaultValues, setDefaultValues] = useState<DefaultFormValues>({
    firstName: "",
    lastName: "",
    email: "",
    fplId: ""
  });

  const { control, handleSubmit, reset } = useForm<FormInput>({ defaultValues });

  useEffect(() => {
    if (loading) return;

    if (!user) {
      setErrorMessage("You are not signed in");

      return;
    }

    const setUserDetails = async (): Promise<void> => {
      const response = await getUserDetails(user);

      if (isError(response)) {
        setErrorMessage(response.message);

        return;
      }

      setDefaultValues({ ...response, fplId: response.fplId.toString() });
    };

    setUserDetails();
  }, [loading, navigate, user]);

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  const onDetailsSave: SubmitHandler<FormInput> = async (data: FormInput): Promise<void> => {
    if (data.password !== data.repeatPassword) {
      return;
    }

    const fplId = parseInt(data.fplId);

    if (!fplId) {
      setErrorMessage("Your FPL ID must be made up of numbers only");
    }

    const response = await updateUserDetails(
      user!.uid,
      data.firstName,
      data.lastName,
      data.email,
      fplId
    );

    if (isError(response)) {
      setErrorMessage(response.message);

      return;
    }

    setAuthModalView("none");
  };

  return (
    <Box
      className='flex-center'
      flexDirection='column'
      width='100%'
    >
      <form className='auth-form' onSubmit={handleSubmit(onDetailsSave)}>
        <Controller
          control={control}
          name='firstName'
          render={({ field: { onChange, value }, fieldState: { error } }): JSX.Element => (
            <TextField
              autoFocus
              disabled={!user}
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
              disabled={!user}
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
              disabled={!user}
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
          name='fplId'
          render={({ field: { onChange, value }, fieldState: { error } }): JSX.Element => (
            <OutlinedInput
              autoFocus
              disabled={!user}
              endAdornment={<FplIdPopover />}
              error={!!error}
              fullWidth
              margin='dense'
              onChange={onChange}
              placeholder='FPL ID'
              required
              value={value}
            />
          )}
        />
        { errorMessage &&
              <Typography
                className='text-ellipsis'
                color={theme.palette.warning.main}
                marginTop={2}
                textAlign='center'
              >{errorMessage}
              </Typography>}
        <Button
          className='action-button'
          color='secondary'
          disabled={!user}
          fullWidth
          sx={{ mt: 2 }}
          type='submit'
          variant='contained'
        >
          <Typography textTransform='none'>Update</Typography>
        </Button>
      </form>
    </Box>
  );
};
