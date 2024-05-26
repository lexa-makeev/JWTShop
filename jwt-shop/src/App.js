import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { ChakraProvider, Box, Container } from "@chakra-ui/react";

import SignUp from "./Components/Auth/SignUp";
import SignIn from "./Components/Auth/SignIn";
import Products from "./Components/Product/Products";
import AddProduct from "./Components/Product/AddProduct";
import Cart from "./Components/Product/Cart";
import NavBar from "./Components/NavBar";
import ResetPassword from "./Components/Auth/ResetPassword";
import UserListPage from "./Components/Users/UserListPage";
import EditProduct from "./Components/Product/EditProduct";
import ProtectedRoute from "./Components/Auth/ProtectedRoute";

function App() {
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    const signout = () => {
        setToken("");
        localStorage.removeItem("token");
        window.location.href = "http://localhost:3000/signin";
    };

    return (
        <ChakraProvider>
            <Router>
                <NavBar token={token} signout={signout} />
                <Container maxW="xl" centerContent>
                    <Box p="4">
                        <Routes>
                            <Route
                                path="/"
                                element={<Navigate to="/signin" />}
                            />
                            <Route
                                path="/signin"
                                element={
                                    token ? (
                                        <Navigate to="/products" />
                                    ) : (
                                        <SignIn setToken={setToken} />
                                    )
                                }
                            />
                            <Route
                                path="/signup"
                                element={
                                    token ? (
                                        <Navigate to="/products" />
                                    ) : (
                                        <SignUp />
                                    )
                                }
                            />

                            <Route
                                path="/products"
                                element={
                                    <ProtectedRoute token={token}>
                                        <Products />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/cart"
                                element={
                                    <ProtectedRoute token={token}>
                                        <Cart />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/add-product"
                                element={
                                    <ProtectedRoute token={token}>
                                        <AddProduct />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/edit-product/:productId"
                                element={
                                    <ProtectedRoute token={token}>
                                        <EditProduct />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/reset-password"
                                element={<ResetPassword />}
                            />
                            <Route
                                path="/users"
                                element={
                                    <ProtectedRoute token={token}>
                                        <UserListPage />
                                    </ProtectedRoute>
                                }
                            />
                        </Routes>
                    </Box>
                </Container>
            </Router>
        </ChakraProvider>
    );
}

export default App;
