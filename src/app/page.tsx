'use client'

import { Box, Button, Container } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter()

  return (
    <Container
      sx={{
        padding: 4
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2
        }}
      >
        <Button variant="contained" onClick={() => router.push("/user")}>User</Button>
        <Button variant="contained" onClick={() => router.push("/product")}>Product</Button>
        <Button variant="contained" onClick={() => router.push("/tasks")}>Task</Button>
      </Box>
    </Container>
  );
}
