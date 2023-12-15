import React, { useState, useEffect } from "react";
import axios from "axios";

const OrdersList = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get(`/react/${userId ? `admin/orders/${userId}` : 'orders/items'}`);
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
  }, [userId]);

  return { orders, loading, error };
};

export default OrdersList;
