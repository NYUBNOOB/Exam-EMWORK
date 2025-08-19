"use client";

import { Box, Button, Container, Tooltip, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import DeleteIcon from "@mui/icons-material/Delete";

export default function  UserPage() {
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://67b40d1e392f4aa94fa91a60.mockapi.io/api/v1/users`
        );
        // ensure each row has "id"
        setUsers(response.data.map((u: any) => ({ ...u, id: u.id })));
      } catch (e) {
        console.log("Error fetch data", e);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: string | number) => {
    if (confirm("Are you sure to delete?")) {
      try {
        await axios.delete(
          `https://67b40d1e392f4aa94fa91a60.mockapi.io/api/v1/users/${id}`
        );
        setUsers(users.filter((user) => user.id !== id));
      } catch (e) {
        console.log("Error data", e);
      }
    }
  };

  const columns: GridColDef[] = [
    { field: "username", headerName: "UserName", width: 200 },
    { field: "email", headerName: "Email", width: 300 },
    { field: "firstName", headerName: "Firstname", width: 200 },
    { field: "lastName", headerName: "Lastname", width: 200 },
    {
      field: "action",
      headerName: "Action",
      type: "actions",
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Box
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          <Tooltip title="แก้ไขข้อมูล">
            <GridActionsCellItem
              icon={<EditIcon color="primary" />}
              label="Update"
              onClick={() => router.push("user/edit/" + params?.row?.id)}
            />
          </Tooltip>
          <Tooltip title="ลบข้อมูล">
            <GridActionsCellItem
              icon={<DeleteIcon color="error" />}
              label="Update"
              onClick={() => handleDelete(params?.row?.id)}
            />
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          py: 1,
        }}
      >
        <Button onClick={() => router.push("/")}>
          <ArrowBackIosIcon fontSize="small" />
          <Typography>Back</Typography>
        </Button>
        <Button
          variant="contained"
          onClick={() => router.push("/user/create")}
        >
          Add User
        </Button>
      </Box>
      <DataGrid rows={users} columns={columns} />
    </Container>
  );
}

