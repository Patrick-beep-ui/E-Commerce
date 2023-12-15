import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);

  // State variable to store user_id values
  const [userIds, setUserIds] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get('/react/users');
        const { users } = response.data;

        const userList = Object.values(users).map(userArray => userArray[0]);

        // Extract user_ids from the users array
        const userIdList = userList.map(user => user.user_id);

        setUsers(userList);
        // Set user_ids in the state variable
        setUserIds(userIdList);
      } catch (e) {
        console.error('Error fetching users:', e);
      }
    };

    getUsers();
  }, []);

  return (
    <>
      <Header />
      <main className="shop container">
        <section className="shop-content user-content">
          {users.map((user) => (
            <div key={user.user_id} className="user-box">
              <Link to={'/admin-orders/'}>
                <h3>User ID: {user.user_id}</h3>
                <p>Name: {user.user_name}</p>
                <p>Email: {user.user_email}</p>
                <p>Is Admin: {user.user_is_admin ? 'Yes' : 'No'}</p>
              </Link>
              <br />
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
