"use client";

import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  MenuItem,
} from "@mui/material";
import { TaskStatus, TaskType } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

interface Type{
  type: "Development" | "Test" | "Document";
  name: string;
  startAt: string;
  endAt: string | null;
  status: "InProgress" | "Finish" | "Cancle";
}

export default function CreateTaskPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    type: "Development",
    name: "",
    startAt: "",
    endAt: "",
    status: "InProgress",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post(`http://localhost:3000/api/tasks`, 
        {
          ...formData
        }
      );
      router.push("/tasks");
    } catch (e) {
      console.error("Error creating task:", e);
    }
  };

  return (
    <Container>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 4 }}
      >
        <Typography variant="h5">Create Task</Typography>

        <TextField
          select
          name="type"
          value={formData.type}
          label="Type"
          onChange={handleChange}
        >
          <MenuItem value={TaskType.Development}>Development</MenuItem>
          <MenuItem value={TaskType.Document}>Document</MenuItem>
          <MenuItem value={TaskType.Test}>Test</MenuItem>
        </TextField>

        <TextField
          name="name"
          value={formData.name}
          label="Name"
          onChange={handleChange}
        />
        <TextField
          name="startAt"
          value={formData.startAt}
          type="date"
          label="Start At"
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
        />

        <TextField
          name="endAt"
          value={formData.endAt}
          type="date"
          label="End At"
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
        />

        <TextField
          select
          name="status"
          value={formData.status}
          label="Status"
          onChange={handleChange}
        >
          <MenuItem value={TaskStatus.InProgress}>InProgress</MenuItem>
          <MenuItem value={TaskStatus.Finish}>Finish</MenuItem>
          <MenuItem value={TaskStatus.Cancle}>Cancle</MenuItem>
        </TextField>

        <Button type="submit" variant="contained">
          Submit
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => router.push("/tasks")}
        >
          Cancel
        </Button>
      </Box>
    </Container>
  );
}
