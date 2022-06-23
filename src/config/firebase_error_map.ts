export const firebaseErrorMap = (authCode: string): string => {
  switch (authCode) {
  case "auth/wrong-password":
    return "Incorrect password entered";

  case "auth/invalid-email":
    return "Invalid email entered";

  case "auth/too-many-requests":
    return "Too many incorrect login attempts - please try again later";

  case "auth/weak-password":
    return "Your password must be a minimum of 6 characters";

  case "auth/credential-already-in-use":
    return "The credentials you entered are already in use";

  case "auth/email-already-in-use":
    return "That email is already in use";

  case "auth/internal-error":
    return "Internal server error";

  case "auth/network-request-failed":
    return "Network request error";

  case "auth/timeout":
    return "Timeout error";

  case "auth/user-not-found":
    return "User not found";

  case "permission-denied":
    return "You don't have access to this data";

  default:
    return authCode;
  }
};
