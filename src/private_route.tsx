import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "config";

interface ProtectedRouteProps {
  component: JSX.Element;
}

export default function PrivateRoute({ component }: ProtectedRouteProps): JSX.Element {
  const user = useAuthState(auth);
  if (user) {
    return component;
  }

  return <Navigate to='/login' />;

}
