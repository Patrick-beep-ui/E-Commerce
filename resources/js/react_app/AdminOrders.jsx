import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AdminOrders({userIds }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getOrders = async () => {
      try {
          const response = await axios.get(`/react/admin/orders/${id}`);
          const { data } = response;
          setOrders(data.orders);
      } catch (e) {
        console.error('Error fetching orders:', e);
        setError('An error occurred while fetching orders.');
      } finally {
        setLoading(false);
      }
    };
    getOrders();
  }, [id]);

  return (
    <>
      <Header />
      <main className="shop container">
        <section className="shop-content">
          {loading ? (
            <p>Loading orders...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <div className="product-box">
              {(() => {
                let counter = 0;

                return Object.keys(orders).map((orderId) => {
                  let totalPrice = 0;
                  counter++;

                  return (
                    <div key={orderId}>
                      <h3>Order ID: {counter}</h3>
                      {orders[orderId].map((orderDetail) => {
                        totalPrice += parseFloat(orderDetail.price);
                        return (
                          <div key={`${orderId}-${orderDetail.product_name}`}>
                            <p className="order-product-name">Product: {orderDetail.product_name}</p>
                            <p className="order-product-category">Category: {orderDetail.category_name}</p>
                            <p>Quantity: {orderDetail.quantity}</p>
                            <p>Price: {orderDetail.price}</p>
                            <br />
                          </div>
                        );
                      })}
                      <p>Total Price: {totalPrice.toFixed(2)}</p>
                    </div>
                  );
                });
              })()}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
