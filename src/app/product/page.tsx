"use client";

import { Box, Button, Container, Tooltip, Typography } from "@mui/material";
import { GridActionsCellItem, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"

export default function ProductPage() {
  const [product, setProduct] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://67b40d1e392f4aa94fa91a60.mockapi.io/api/v1/products/`
        );
        setProduct(response.data.map((p: any) => ({ ...p, id: p.id })));
      } catch (e) {
        console.log("Error fetch data");
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id: string | number) => {
    if (confirm("Are you sure to delete?")) {
      try {
        await axios.delete(
          `https://67b40d1e392f4aa94fa91a60.mockapi.io/api/v1/products/${id}`
        );
        setProduct(product.filter((product) => product.id !== id));
      } catch (e) {
        console.log("Error data", e);
      }
    }
  };

  const columns: GridColDef[] = [
    { field: "productName", headerName: "ProductName", width: 200 },
    { field: "price", headerName: "Price", width: 200 },
    { field: "stock", headerName: "Stock", width: 200 },
    { field: "category", headerName: "Category", width: 200 },
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
              onClick={() => router.push("product/edit/" + params?.row?.id)}
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
          py: 1
        }}
      >
        <Button onClick={() => router.push("/")}>
          <ArrowBackIosIcon fontSize="small" />
          <Typography>Back</Typography>
        </Button>
        <Button
          variant="contained"
          onClick={() => router.push("/product/create")}
        >
          Add Product
        </Button>
      </Box>
      <Box>
        <DataGrid rows={product} columns={columns} />
      </Box>
    </Container>
  );
}
