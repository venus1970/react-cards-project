import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminCRMPanel = () => {
  const [usernames, setUsernames] = useState([]);

  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const response = await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users");
        const usernames = response.data.map(user => user.username);
        setUsernames(usernames);
      } catch (error) {
        console.error('Error fetching usernames:', error);
      }
    };

    fetchUsernames();
  }, []);

  return (
    <div>
      <h1>User Management: Admin CRM Panel</h1>
      <h2>List of Users</h2>
      <ul>
        {usernames.map(username => (
          <li key={username}>{username}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCRMPanel;
