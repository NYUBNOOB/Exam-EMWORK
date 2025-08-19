"use client";

import { Box, Button, Container, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams, GridActionsCellItem } from "@mui/x-data-grid";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

interface Task {
  id: string;
  type: "Development" | "Test" | "Document";
  name: string;
  status: "InProgress" | "Finish" | "Cancle";
  startAt: string;
  endAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function TaskPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/tasks`);
        setTasks(response.data);
      } catch (e) {
        console.error("Error fetch data", e);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure to delete this task?")) {
      try {
        await axios.delete(`http://localhost:3000/api/tasks/${id}`);
        setTasks(tasks.filter((t) => t.id !== id));
      } catch (e) {
        console.error("Error deleting task", e);
      }
    }
  };

  const columns: GridColDef[] = [
    { field: "type", headerName: "Type", width: 150 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "startAt", headerName: "StartAt", width: 180 },
    { field: "endAt", headerName: "End At", width: 180 },
    { field: "createdAt", headerName: "CreatedAt", width: 180 },
    { field: "updatedAt", headerName: "UpdatedAt", width: 180 },
    {
      field: "action",
      headerName: "Action",
      type: "actions",
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Edit Task">
            <GridActionsCellItem
              icon={<EditIcon color="primary" />}
              label="Edit"
              onClick={() => router.push(`/tasks/edit/${params.row.id}`)}
            />
          </Tooltip>
          <Tooltip title="Delete Task">
            <GridActionsCellItem
              icon={<DeleteIcon color="error" />}
              label="Delete"
              onClick={() => handleDelete(params.row.id)}
            />
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "space-between", py: 2 }}>
        <Button onClick={() => router.push("/")}>
          <ArrowBackIosIcon fontSize="small" /> <Typography>Back</Typography>
        </Button>
        <Button variant="contained" onClick={() => router.push("/tasks/create")}>
          Add Task
        </Button>
      </Box>

      <Box sx={{ height: 600, width: "100%" }}>
        <DataGrid rows={tasks} columns={columns} getRowId={(row) => row.id} />
      </Box>
    </Container>
  );
}
