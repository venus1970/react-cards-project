import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminCrmPanel = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Simulating API request to fetch list of users
        const response = await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users");
        setUsers(response.data); // Assuming the response contains an array of user objects
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleStatusChange = async (userId) => {
    try {
      // Simulate changing user status by sending a PATCH request
      await axios.patch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userId}/status`, { active: true });
      // Assuming your API supports changing user status via a PATCH request
      // You can adjust the endpoint and payload according to your API documentation
      // After successfully changing status, update the user's status in the local state
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userId ? { ...user, active: true } : user
        )
      );
    } catch (error) {
      console.error('Error changing user status:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      // Simulate deleting user by sending a DELETE request
      await axios.delete(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userId}`);
      // Assuming your API supports deleting users via a DELETE request
      // You can adjust the endpoint according to your API documentation
      // After successfully deleting user, remove the user from the local state
      setUsers(prevUsers =>
        prevUsers.filter(user => user.id !== userId)
      );
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h1>User Management: Admin CRM Panel</h1>
      <h2>List of Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username} - Active: {user.active ? 'Yes' : 'No'}
            <button onClick={() => handleStatusChange(user.id)}>
              {user.active ? 'Deactivate' : 'Activate'}
            </button>
            {!user.isAdmin && (
              <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCrmPanel;
