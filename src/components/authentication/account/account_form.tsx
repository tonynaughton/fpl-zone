
import React, { Fragment, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Controller,SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Info } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography
} from "@mui/material";
import {
  auth,
  getUserDetails,
  updateUserDetails
} from "config/firebase";
import { deleteUser } from "firebase/auth";
import { delay } from "helpers";
import { isError } from "lodash";

import { Notifier } from "components/layout";

interface AccountFormProps {
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

export const AccountForm = ({ closeAuthModal }: AccountFormProps): JSX.Element => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
    fplId: ""
  };

  const [userData, setUserData] = useState(defaultValues);

  const [userFound, setUserFound] = useState(false);
  const [showFplIdModal, setShowFplIdModal] = useState(false);
  const [deleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false);

  const setDefaultValues = async (): Promise<void> => {
    if (!user) return;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const response = await getUserDetails(user!);

    if (isError(response)) {
      // TODO Get user details error message
      return;
    }

    setUserData({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: "",
      repeatPassword: "",
      fplId: userData.fplId
    });
    setUserFound(true);
  };

  const { control, handleSubmit, reset } = useForm<FormInput>({ defaultValues });

  useEffect(() => {
    if (loading) return;
    setDefaultValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, navigate, user]);

  useEffect(() => {
    reset(userData);
  }, [reset, userData]);

  const onDetailsSave: SubmitHandler<FormInput> = async (data: FormInput): Promise<void> => {
    if (data.password !== data.repeatPassword) {
      return;
    }

    if (!user) {
      // TODO You are not logged in message
      return;
    }

    const response = await updateUserDetails(
      user.uid,
      data.firstName,
      data.lastName,
      data.email,
      data.fplId
    );

    if (isError(response)) {
      // TODO could not update user details
      return;
    }

    closeAuthModal();
  };

  const handleDeleteAccountClick = async (): Promise<void> => {
    if (user) {
      await deleteUser(user);
      await delay(1000);
    }
  };

  return (
    <Box component='div'>
      {!userFound
        ? (
          <Notifier message='Fetching user data..' />
        )
        : (
          <>
            <form onSubmit={handleSubmit(onDetailsSave)}>
              <Controller
                control={control}
                name='firstName'
                render={({ field: { onChange, value }, fieldState: { error } }): JSX.Element => (
                  <TextField
                    error={!!error}
                    fullWidth
                    margin='dense'
                    onChange={onChange}
                    placeholder='First name'
                    required
                    size='small'
                    sx={{ mt: 2 }}
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
                    size='small'
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
                    size='small'
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
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='show fpl id modal'
                          edge='end'
                          onClick={(): void => setShowFplIdModal(true)}
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
                    size='small'
                    sx={{ mt: 1 }}
                    value={value}
                  />
                )}
              />
              <Button
                className='action-button'
                color='secondary'
                fullWidth
                sx={{ mt: 2 }}
                type='submit'
                variant='contained'
              >
                <Typography textTransform='none' variant='h3'>Update</Typography>
              </Button>
              <Button
                className='action-button'
                color='error'
                fullWidth
                onClick={(): void => setDeleteAccountModalOpen(true)}
                sx={{ mt: 3 }}
                variant='contained'
              >
                <Typography textTransform='none' variant='h3'>
                Delete Account
                </Typography>
              </Button>
            </form>
          </>
        )}
    </Box>
  );
};
