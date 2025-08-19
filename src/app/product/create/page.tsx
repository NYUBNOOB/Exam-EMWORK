"use client";

import { Box, Container, TextField, Typography, Button } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

interface ProductType {
  productname: string;
  description: string;
  price: string;
  stock: string;
  category: string;
}

export default function CreateProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<ProductType>({
    productname: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post(
        `https://67b40d1e392f4aa94fa91a60.mockapi.io/api/v1/products/`,
        {
          productName: formData.productname,
          description: formData.description,
          price: formData.price,
          stock: formData.stock,
          category: formData.category,
        }
      );
      router.push("/product");
    } catch (e) {
      console.log("Error create Data");
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
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
          name="productname"
          value={formData?.productname}
          label="productname"
          onChange={handleChange}
        />
        <TextField
          name="description"
          value={formData?.description}
          label="description"
          onChange={handleChange}
        />
        <TextField
          name="price"
          value={formData?.price}
          label="price"
          onChange={handleChange}
        />
        <TextField
          name="category"
          value={formData?.category}
          label="category"
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
          Cancle
        </Button>
      </Box>
    </Container>
  );
}
