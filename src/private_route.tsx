import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "config/firebase";

interface ProtectedRouteProps {
  component: JSX.Element;
}

export default function PrivateRoute({ component }: ProtectedRouteProps): JSX.Element {
  const user = useAuthState(auth);
  if (user) {
    return component;
  } else {
    return <Navigate to='/login' />;
  }
}
