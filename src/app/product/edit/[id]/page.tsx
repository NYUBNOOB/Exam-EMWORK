"use client";

import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

interface ProductType {
  productName: string;
  description: string;
  price: string;
  stock: string;
  category: string;
}

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState<ProductType>({
    productName: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://67b40d1e392f4aa94fa91a60.mockapi.io/api/v1/products/${id}`
      );
      setFormData(response.data);
    } catch (e) {
      console.log("Error fetch data");
    }
  };
  fetchData();
}, [id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.put(
        `https://67b40d1e392f4aa94fa91a60.mockapi.io/api/v1/products/${id}`,
        {
          ...formData
        }
      );
      router.push("/product");
    } catch (e) {
      console.log("Error Update Data");
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
        <Typography variant="h5">Edit User</Typography>
        <TextField
          name="productName"
          label="Productname"
          value={formData?.productName}
          onChange={handleChange}
        />
        <TextField
          name="description"
          label="description"
          value={formData?.description}
          onChange={handleChange}
        />
        <TextField
          name="price"
          label="price"
          value={formData?.price}
          onChange={handleChange}
        />
        <TextField
          name="stock"
          label="stock"
          value={formData?.stock}
          onChange={handleChange}
        />
        <TextField
          name="category"
          label="category"
          value={formData?.category}
          onChange={handleChange}
        />

        <Button type="submit" variant="contained">
          Submit
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => router.push("/product")}
        >
          Canle
        </Button>
      </Box>
    </Container>
  );
}
