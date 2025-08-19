"use client";

import { Box, Container, TextField, Typography, Button, MenuItem } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

interface Task {
  id?: number;
  type: "Development" | "Test" | "Document";
  name: string;
  startAt: string;
  endAt: string | null;
  status: "InProgress" | "Finish" | "Cancle";
}

const taskTypes = ["Development", "Test", "Document"];
const taskStatus = ["InProgress", "Finish", "Cancle"];

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
      await axios.post("/api/tasks", formData);
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

        {/* Type select */}
        <TextField
          select
          name="type"
          value={formData.type}
          label="Type"
          onChange={handleChange}
        >
          {taskTypes.map((t) => (
            <MenuItem key={t} value={t}>
              {t}
            </MenuItem>
          ))}
        </TextField>

        {/* Name */}
        <TextField
          name="name"
          value={formData.name}
          label="Name"
          onChange={handleChange}
        />

        {/* StartAt */}
        <TextField
          name="startAt"
          value={formData.startAt}
          label="Start At"
          type="datetime-local"
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
        />

        {/* EndAt */}
        <TextField
          name="endAt"
          value={formData.endAt}
          label="End At"
          type="datetime-local"
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
        />

        {/* Status select */}
        <TextField
          select
          name="status"
          value={formData.status}
          label="Status"
          onChange={handleChange}
        >
          {taskStatus.map((s) => (
            <MenuItem key={s} value={s}>
              {s === "Cancle" ? "Cancel" : s}
            </MenuItem>
          ))}
        </TextField>

        <Button type="submit" variant="contained">
          Submit
        </Button>
        <Button variant="contained" color="error" onClick={() => router.push("/tasks")}>
          Cancel
        </Button>
      </Box>
    </Container>
  );
}
