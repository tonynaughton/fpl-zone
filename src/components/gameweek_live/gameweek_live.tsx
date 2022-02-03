import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "config/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { Button, Typography } from "@mui/material";
import Layout from "components/layout/layout";
import { gameweekLiveData } from "api/fpl_api_provider";

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

  const fetchGwLiveData = async () => {
    gameweekLiveData();
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    fetchUserName();
  });

  return (
    <Layout active="gameweek-live">
      <Typography variant="h2">Logged in as: {name}</Typography>
      <Button size="large" onClick={logout}>
        Logout
      </Button>
      <Button size="large" onClick={fetchGwLiveData}>
        Fetch GW Data
      </Button>
    </Layout>
  );
}
