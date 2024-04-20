import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer"

export default function WhishList() {
  const [whishlist, setWhishlist] = useState([]);


  useEffect(() => {
    const getWhishList = async () => {
      try {
        const response = await axios.get('/react/whishlist/items');
        const { data } = response;
        setWhishlist(data.orders);
        console.log(data.orders);
      } catch (e) {
        console.error('Error fetching orders:', e);
      }
    };
    getWhishList();
  }, []);

  return (
    <>
      <Header />
      <main className="shop container orders-container">
        <section className="orders-list">
        <span id="order-heading">Orders</span>
            
        </section>
      </main>
      <Footer/>
    </>
  );
}