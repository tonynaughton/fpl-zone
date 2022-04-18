import React, { useEffect, useState } from "react";
import { logout } from "config/firebase";
import { Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import { LoadingMessage } from "components/layout";

export function Logout(): JSX.Element {
  const [loggedOut, setLoggedOutStatus] = useState<boolean>(false);

  useEffect(() => {
    logout().then(() => {
      setLoggedOutStatus(true);
    });
  }, []);

  return !loggedOut ? (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
      <LoadingMessage message="Loggout out.." />
    </Box>
  ) : (
    <Navigate to="/login" />
  );
}
