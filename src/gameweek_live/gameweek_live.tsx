import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../config/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { Box, Button, Container, Typography } from "@mui/material";

export default function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const fetchUserName = async () => {
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
    <Container component="main" maxWidth="md">
      <Box component="div">
        <Typography variant="h2">Logged in as: {name}</Typography>
        <Button size="large" color="info" onClick={logout}>
          Logout
        </Button>
      </Box>
    </Container>
  );
}
