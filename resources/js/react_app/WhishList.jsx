import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function WhishList() {
  const [whishlist, setWhishlist] = useState([]);

  useEffect(() => {
    const getWhishList = async () => {
      try {
        const response = await axios.get('/react/whishlist/items');
        const { data } = response;
        setWhishlist(data.wishlist); 
        console.log(data.wishlist); 
      } catch (e) {
        console.error('Error fetching wishlist:', e);
      }
    };
    getWhishList();
  }, []);

  return (
    <>
      <Header />
      <main className="shop container orders-container">
        <section className="orders-list">
          <span id="order-heading">Wishlist</span>
          <div className="shop-content">
            {whishlist.map((item) => (
              <div 
                key={item.wishlist_id} 
                className="product-box" 
                data-category="wishlist" 
                data-stock="In Stock" 
              >
                <a href={`/react/product/${item.product_id}`}>
                  <img className="product-img" src={item.product_image} alt={item.product_name} />
                </a>
                <h2 className="product-name">{item.product_name}</h2>
                <p>Added on: {new Date(item.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
