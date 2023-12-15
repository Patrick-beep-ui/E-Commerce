import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer"

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get('/react/orders/items');
        const { data } = response;
        setOrders(data.orders);
        console.log(data.orders);
      } catch (e) {
        console.error('Error fetching orders:', e);
      }
    };
    getOrders();
  }, []);

  return (
    <>
      <Header />
      <main className="shop container">
        <section className="shop-content">
          <div className="product-box">
            {(() => {
              let counter = 0;

              //maps the order and assigns the object value to orderId
              return Object.keys(orders).map((orderId) => {
                let totalPrice = 0;
                {counter++}

                return (
                  <div key={orderId}>
                    <h3>Order ID: {counter}</h3>
                    {/** maps the order assigning the id of the order to OrderDetail*/}
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
        </section>
      </main>
      <Footer/>
    </>
  );
}
