import React, { useState } from "react";
import {useOutletContext, useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
import Cart from "../components/Cart";
import Product from "../components/Product";

export default function Header() {
    const [cartItems, setCartItems] = useState([]);
    const [cartVisible, setCartVisible] = useState(false);
    const navigate = useNavigate();

   
    const openCart = () => {
        setCartVisible(true);
    };

    const closeCart = () => {
        setCartVisible(false);
    };

    //Check if the user is logged in
    async function checkUser() {
        try {
            const response = await axios.get('/check');
            const { is_user_auth } = response.data;
                if (is_user_auth) {
                        console.log("User is logged in");
                        navigate('/user-info');

                    }
                    else {
                        navigate('/login');
                    }
        
                } catch (error) {
                    console.error('Logout error:', error);
                }
        }

        /*
    async function logoutUser() {
        try {
            const response = await axios.get('/logout');
            const { is_auth } = response.data;
            console.log('Logout successful');
            } 
            catch (error) {
                console.error('Logout error:', error);
            }
        }
        */

        /* <i className='bx bx-search-alt-2' id="search-icon"></i> */

    return (
        <header>
            <nav className="nav container">
                <div className="search-icon">
                <i className='bx bxs-user-circle' id="user-icon" onClick={checkUser}></i>
                </div>
                <div className="logo">
                    <Link to={'/'}>SUP</Link>
                </div>
                <div className="user-icons">
                    <i className='bx bx-cart-alt' id="cart-icon" onClick={openCart}></i>
                </div>
                <Cart cartItems={cartItems} cartVisible={cartVisible} closeCart={closeCart} />
            </nav>
        </header>
    );
}
