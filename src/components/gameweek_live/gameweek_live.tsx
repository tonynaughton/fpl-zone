import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "config/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { Button } from "@mui/material";
import AppLayout from "components/layout/app_layout";

export default function Dashboard(): JSX.Element {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const fetchUserName = async (): Promise<void> => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    fetchUserName();
  });

  return (
    <AppLayout active="gameweek-live" title="Gameweek Live">
      <Button size="large" onClick={logout}>
        Logout
      </Button>
    </AppLayout>
  );
}
