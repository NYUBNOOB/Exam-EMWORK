'use client'

import { Box, Button, Container, Typography } from "@mui/material";
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
          alignItems: "center",
          gap: 2
        }}
      >
        <Typography variant="h4">Exam EMWORK</Typography>
        <Button variant="contained" onClick={() => router.push("/tasks")}>Task</Button>
      </Box>
    </Container>
  );
}
