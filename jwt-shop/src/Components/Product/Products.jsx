import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { Box, Button, Text, Grid, IconButton } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa"; // Иконки для редактирования и удаления
import axios from "axios";

function Products() {
    let token = localStorage.getItem("token");
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    "http://127.0.0.1:7000/api/products",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const addToCart = async (productId) => {
        try {
            const response = await axios.post(
                "http://127.0.0.1:7000/api/cart",
                {
                    productId,
                    quantity: 1, // Default quantity for now
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Product added to cart:", response.data);
        } catch (error) {
            console.error("Error adding product to cart:", error);
        }
    };

    const handleEditProduct = (productId) => {
        navigate(`/edit-product/${productId}`);
    };

    const handleDeleteProduct = async (productId) => {
        try {
            const response = await axios.delete(
                `http://127.0.0.1:7000/api/products/${productId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Product deleted:", response.data);
            // Обновляем список товаров после удаления
            setProducts(products.filter((product) => product.id !== productId));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <Box>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                {products.map((product) => (
                    <Box
                        key={product.id}
                        borderWidth="1px"
                        p="4"
                        borderRadius="md"
                    >
                        <Text>Наименование: {product.name}</Text>
                        <Text>Цена: {product.price} руб.</Text>
                        <Text>Описание: {product.description}</Text>
                        <Button
                            marginTop={"20px"}
                            colorScheme="teal"
                            onClick={() => addToCart(product.id)}
                        >
                            Добавить в корзину
                        </Button>
                        <IconButton
                            marginTop={"20px"}
                            marginRight={"10px"}
                            colorScheme="blue"
                            aria-label="Редактировать товар"
                            icon={<FaEdit />}
                            onClick={() => handleEditProduct(product.id)}
                        />
                        <IconButton
                            marginTop={"20px"}
                            colorScheme="red"
                            aria-label="Удалить товар"
                            icon={<FaTrash />}
                            onClick={() => handleDeleteProduct(product.id)}
                        />
                    </Box>
                ))}
            </Grid>
        </Box>
    );
}

export default Products;
