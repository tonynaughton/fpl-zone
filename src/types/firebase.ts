export interface FirebaseError {
  code: string;
  message: string;
}

export interface UserData {
  uid: string;
  firstName: string;
  lastName: string;
  authProvider: string;
  email: string;
  fplId: number;
}

export interface DefaultUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
  fplId: number;
}
