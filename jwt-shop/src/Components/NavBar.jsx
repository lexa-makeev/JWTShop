// src/Components/NavBar.js
import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Button } from "@chakra-ui/react";

function NavBar({ token, signout }) {
    return (
        <Box bg="teal.500" px={4}>
            <Flex h={16} alignItems="center" justifyContent="space-between">
                <Box>
                    {token && (
                        <>
                            <Link to="/products">
                                <Button colorScheme="teal" variant="ghost">
                                    Продукты
                                </Button>
                            </Link>
                            <Link to="/cart">
                                <Button colorScheme="teal" variant="ghost">
                                    Корзина
                                </Button>
                            </Link>
                            <Link to="/add-product">
                                <Button colorScheme="teal" variant="ghost">
                                    Добавить продукты
                                </Button>
                            </Link>
                            <Link to="/users">
                                <Button colorScheme="teal" variant="ghost">
                                    Пользователи
                                </Button>
                            </Link>
                        </>
                    )}
                </Box>
                {token && (
                    <Button colorScheme="red" onClick={signout}>
                        Выйти
                    </Button>
                )}
            </Flex>
        </Box>
    );
}

export default NavBar;
