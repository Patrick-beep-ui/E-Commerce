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
      <main className="shop container orders-container">
        <section className="orders-list">
        <span id="order-heading">Orders</span>
            {(() => {
              let counter = 0;

              //maps the order and assigns the object value to orderId
              return Object.keys(orders).map((orderId) => {
                let totalPrice = 0;
                {counter++}

                return (
                  <div key={orderId} className="order">
                    <div className="order-creation">
                        <h3 id="order-number">Order #{orderId}</h3>
                        <span>Order Placed: {orders[orderId][0].date.creation_date}</span>
                    </div>
                    <div className="order-item-details">
                      <p>Item</p>
                      <p>Attributes</p>
                      <p>Quantity</p>
                      <p>Price</p>
                    </div>
                    {/** maps the order assigning the id of the order to OrderDetail*/}
                    {orders[orderId].map((orderDetail) => {
                      totalPrice += parseFloat(orderDetail.price);
                      return (
                        <div key={`${orderId}-${orderDetail.product_name}`} className="order-items">
                          <div className="order-item-img">
                            <img src={orderDetail.product_image} alt={orderDetail.product_name} />
                          </div>
                          <div className="order-item-name order-item">
                              <p className="order-product-name">{orderDetail.product_name}</p>
                              <p className="order-product-category">Category: {orderDetail.category_name}</p>
                          </div>
                          <div className="order-item-variation order-item">
                            <span className="item-color order-color" style={{ backgroundColor: '#b38b59' }}></span>
                          </div>
                            <div className="order-item-quantity order-item">
                              <p>x{orderDetail.quantity}</p>
                            </div>
                            <div className="order-item-price order-item">
                            <p>${orderDetail.price}</p>
                            </div>
                        </div>
                        
                      );
                    })}
                    <p id="order-total"> ${totalPrice.toFixed(2)}</p>
                    
                  </div>
                );
                
              });
            })()}
        </section>
      </main>
      <Footer/>
    </>
  );
}