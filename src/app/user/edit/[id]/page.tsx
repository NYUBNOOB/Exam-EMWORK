"use client"

import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditUserPage() {
  const router = useRouter();
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.put(
        `https://67b40d1e392f4aa94fa91a60.mockapi.io/api/v1/users/${id}`,
        {
          username: username,
          password: password,
          email: email,
          firstName: firstname,
          lastName: lastname,
        }
      );
      router.push("/users");
    } catch (e) {
      console.log("Error data", e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://67b40d1e392f4aa94fa91a60.mockapi.io/api/v1/users/${id}`
        );
        setUsername(response.data.username);
        setPassword(response.data.password);
        setEmail(response.data.email);
        setFirstname(response.data.firstName);
        setLastname(response.data.lastName);
      } catch (e) {
        console.log("Error fetch data", e);
      }
    };

    fetchData();
  }, []);

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
        <Typography variant="h5">Edit User</Typography>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField 
          label="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
        />
        <TextField
          label="First Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <TextField
          label="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />

        <Button type="submit" variant="contained">
          Submit
        </Button>
        <Button variant="contained" color="error" onClick={() => router.push("/user")}>Canle</Button>
      </Box>
    </Container>
  );
}


