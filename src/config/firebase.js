import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        fplId: "",
      });
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    alert(err.message);
  }
};

export const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    alert(err.message);
  }
};

export const registerWithEmailAndPassword = async (
  firstName,
  lastName,
  email,
  password,
  fplId = ""
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      firstName,
      lastName,
      authProvider: "local",
      email,
      fplId,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    alert(err.message);
  }
};

export const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    alert(err.message);
  }
};

export const updateUserDetails = async (uid, firstName, lastName, fplId = "") => {
  const q = query(collection(db, "users"), where("uid", "==", uid));
  const docs = await getDocs(q);
  const user = doc(db, "users", docs.docs[0].id);
  try {
    await updateDoc(user, {
      firstName,
      lastName,
      fplId,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    alert(err.message);
  }
};

export const logout = () => {
  signOut(auth);
};
