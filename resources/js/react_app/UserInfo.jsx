import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer"

export default function UserInfo() {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios('/react/orders/items');
        const { data } = response;
      } catch (e) {
        console.error('Error fetching orders:', e);
      }
    };
    getOrders();
  }, []);

  async function logoutUser() {
    try {
        const response = await axios.get('/logout');
        const { is_auth } = response.data;
        console.log('Logout successful');
        checkUser();
        } 
        catch (error) {
            console.error('Logout error:', error);
        }
    }

    async function checkUser() {
        try {
            const response = await axios.get('/check');
            const { is_user_auth } = response.data;
                if (!is_user_auth) {
                        navigate('/');
                    }
                    else {
                        logoutUser();
                    }
        
                } catch (error) {
                    console.error('Logout error:', error);
                }
        }

  return (
    <>
      <Header />
      <main className="shop container">
        <section className="shop-content user-info">
            <section className="user-picture">
                <div className="profile">
                    <div className="profile-pic">
                    </div>
                    <div className="profile-details">
                    <p className="profile-quote">Upload a New Photo</p>
                    <p className="profile-name">Patrick Solis</p>
                    </div>
                </div>
                <div className="picture-options">
                    <button type="button" className="update-pic-btn" >Update</button>
                </div>
            </section>
          <section className="user-details">
          <Link to="/">
                Personal Information
            </Link>
            <Link to="/orders">
                My orders
            </Link>
            <Link to="/whishlist">
                WhishList
            </Link>
            <Link to="/orders">
                Payment Methods
            </Link>
            <button type="button" className="sign-out-btn" onClick={logoutUser}>Log-Out</button>
          </section>
        </section>
      </main>
      <Footer/>
    </>
  );
}
