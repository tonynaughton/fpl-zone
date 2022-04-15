import React, { useEffect } from "react";
import { logout } from "config/firebase";
import { Navigate } from "react-router-dom";

export default function Logout(): JSX.Element {
  useEffect(() => {
    logout();
  }, []);

  return <Navigate to="/login" />;
}
