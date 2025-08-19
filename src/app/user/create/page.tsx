"use client";

import { Box, Container, TextField, Typography, Button } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateUserPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post(
        `https://67b40d1e392f4aa94fa91a60.mockapi.io/api/v1/users`,
        {
          username: username,
          password: password,
          email: email,
          firstName: firstname,
          lastName: lastname,
        }
      );
      router.push("/user");
    } catch (e) {
      console.log("Error data", e);
    }
  };

  return (
    <Container>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: 4,
        }}
      >
        <Typography variant="h5">Create User</Typography>

        <TextField
          label="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField label="Email" onChange={(e) => setEmail(e.target.value)} />
        <TextField
          label="First Name"
          onChange={(e) => setFirstname(e.target.value)}
        />
        <TextField
          label="Last Name"
          onChange={(e) => setLastname(e.target.value)}
        />

        <Button type="submit" variant="contained">
          Submit
        </Button>
        <Button variant="contained" color="error" onClick={() => router.push("/user")}>Cancle</Button>
      </Box>
    </Container>
  );
}

