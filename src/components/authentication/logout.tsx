import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import { logout } from "config/firebase";

import { Notifier } from "components/layout";

export function Logout(): JSX.Element {
  const [loggedOut, setLoggedOutStatus] = useState<boolean>(false);

  useEffect(() => {
    logout().then(() => {
      setLoggedOutStatus(true);
    });
  }, []);

  return !loggedOut ? (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
      <Notifier message='Logging out..' />
    </Box>
  ) : (
    <Navigate to='/login' />
  );
}
