import { FirebaseError, initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  deleteUser as deleteAuthUser,
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateEmail,
  User } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setLogLevel,
  updateDoc,
  where } from "firebase/firestore";
import { UserData } from "types/firebase";

import { firebaseErrorMap } from "./firebase_error_map";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

setLogLevel("silent");

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<void | Error> => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const { user } = res;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    const name = user.displayName?.split(" ");
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        firstName: name ? name[0] : "",
        lastName: name ? name[1] : "",
        authProvider: "google",
        email: user.email,
        fplId: ""
      });
    }
  } catch (err) {
    const message = firebaseErrorMap((err as FirebaseError).code);

    return new Error(message);
  }
};

export const logInWithEmailAndPassword = async (email: string, password: string): Promise<Error | void> => {
  try {
    await signInWithEmailAndPassword(auth, email, password).catch();
  } catch (err) {
    const message = firebaseErrorMap((err as FirebaseError).code);

    return new Error(message);
  }
};

export const registerWithEmailAndPassword = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  fplId = ""
): Promise<Error | void> => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = res;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      firstName,
      lastName,
      authProvider: "local",
      email,
      fplId
    });
  } catch (err) {
    const message = firebaseErrorMap((err as FirebaseError).code);

    return new Error(message);
  }
};

export const sendPasswordReset = async (email: string): Promise<Error | void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err) {
    const message = firebaseErrorMap((err as FirebaseError).code);

    return new Error(message);
  }
};

export const updateUserDetails = async (
  uid: string,
  firstName: string,
  lastName: string,
  email: string,
  fplId?: number
): Promise<Error | void> => {
  if (!auth.currentUser) {
    return new Error("You are not currently logged in");
  }

  try {
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const docs = await getDocs(q);
    const user = doc(db, "users", docs.docs[0].id);

    updateEmail(auth.currentUser, email);
    await updateDoc(user, {
      firstName,
      lastName,
      email,
      fplId
    });
  } catch (err) {
    const message = firebaseErrorMap((err as FirebaseError).code);

    return new Error(message);
  }
};

export const deleteUser = async (user: User): Promise<Error | void> => {
  try {
    const q = query(collection(db, "users"), where("uid", "==", user?.uid));
    const userDoc = await getDocs(q);
    const userId = userDoc.docs[0].id;

    await deleteAuthUser(user);
    await deleteDoc(doc(db, "users", userId));
  } catch (err) {
    const message = firebaseErrorMap((err as FirebaseError).code);

    return new Error(message);
  }
};

export const getUserDetails = async (user: User): Promise<Error | UserData> => {
  try {
    const q = query(collection(db, "users"), where("uid", "==", user?.uid));
    const doc = await getDocs(q);
    const userData = doc.docs[0].data() as UserData;

    return userData;
  } catch (err) {
    const message = firebaseErrorMap((err as FirebaseError).code);

    return new Error(message);
  }
};

export const getUserFplTeamId = async (uid: string): Promise<number> => {
  if (!uid) throw new Error("No user ID received");

  try {
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const docs = await getDocs(q);
    const userRef = doc(db, "users", docs.docs[0].id);
    const user = await getDoc(userRef);
    const userData = user.data() as UserData | undefined;

    if (!userData) throw new Error("No user data found");
    if (!userData.fplId) throw new Error("No FPL team found with your ID");

    return userData.fplId;
  } catch (err) {
    throw new Error((err as FirebaseError).message);
  }
};

export const logout = async (): Promise<Error | void> => {
  try {
    await signOut(auth);
  } catch (err) {
    const message = firebaseErrorMap((err as FirebaseError).code);

    return new Error(message);
  }
};
