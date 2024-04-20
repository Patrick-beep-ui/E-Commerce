import "../bootstrap.js"
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider, Outlet, useOutletContext } from "react-router-dom";  // Make sure to include react-router-dom
import Login from "./Login";
import Home from "./Home";
import Catalog from "./Catalog";
import Orders from "./Orders";
import ProductInfo from "./ProductInfo";
import Admin from "./Admin";
import AdminOrders from "./AdminOrders";
import UserInfo from "./UserInfo";



function App() {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")||"[]"));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")||"{}"));
    useEffect(function(){
        axios.get('/sanctum/csrf-cookie')
    },[])

    return (
        <Outlet context={[cart, setCart, user, setUser]} />
        
    );
}

const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/catalog",
                element: <Catalog />
            },
            {
                path: "/orders",
                element: <Orders />
            },
            {
                path:"/product/:id",
                element: <ProductInfo />
            },
            {
                path: "/admin/*",
                element: <Admin />
            },
            {
                path: "/admin-orders/:id",
                element: <AdminOrders />
            },
            {
                path: "/user-info",
                element: <UserInfo />
            }
         
        ]
    }
], { basename: "/react" });

const root = ReactDOM.createRoot(document.querySelector("body"));
root.render(<RouterProvider router={router}><App /></RouterProvider>);