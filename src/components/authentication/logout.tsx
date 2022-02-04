import { logout } from "config/firebase";
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function Logout() {
  useEffect(() => {
    logout();
  });

  return <Navigate to="/login" />;
}
