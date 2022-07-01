
import React, { useEffect, useState } from "react";
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

import { Notifier } from "components/layout";

import { FplIdPopover } from "../fpl_id_popover";

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
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [notifierMessage, setNotifierMessage] = useState<string>("Fetching user data..");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const theme = useTheme();

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    fplId: ""
  };

  const [userData, setUserData] = useState(defaultValues);

  const [userFound, setUserFound] = useState(false);

  const setDefaultValues = async (): Promise<void> => {
    if (!user) return;

    const response = await getUserDetails(user);

    if (isError(response)) {
      setErrorMessage(response.message);
      setNotifierMessage(response.message);

      return;
    }

    setUserData({
      firstName: response.firstName,
      lastName: response.lastName,
      email: response.email,
      fplId: response.fplId.toString()
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
      setErrorMessage("You are not currently logged in");

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
      setErrorMessage(response.message);

      return;
    }

    closeAuthModal();
  };

  return (
    <Box
      className='flex-center'
      flexDirection='column'
      paddingLeft={15}
      paddingRight={15}
      width='100%'
    >
      {!userFound
        ? (
          <Notifier message={notifierMessage} type={errorMessage ? "error" : "loading"} />
        )
        : (
          <>
            <form className='auth-form' onSubmit={handleSubmit(onDetailsSave)}>
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
                name='fplId'
                render={({ field: { onChange, value }, fieldState: { error } }): JSX.Element => (
                  <OutlinedInput
                    autoFocus
                    endAdornment={<FplIdPopover />}
                    error={!!error}
                    fullWidth
                    margin='dense'
                    onChange={onChange}
                    placeholder='FPL ID'
                    required
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
                color={theme.palette.warning.main}
                marginTop={2}
                textAlign='center'
              >{errorMessage}
              </Typography>}
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
            </form>
          </>
        )}
    </Box>
  );
};
