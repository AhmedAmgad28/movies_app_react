import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3001/loggedInUser')
      .then(response => {
        const userId = response.data[0].userId;
        return axios.get(`http://localhost:3001/users/${userId}`);
      })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the user data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center' }}>Loading...</div>;
  }

  if (!user) {
    return (
      <div style={{ textAlign: 'center' }}>
        <p>You need to register or login to view this page.</p>
        <a href="/register" style={{ marginRight: '10px' }}>Register</a>
        <a href="/login">Login</a>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '88vh',
      backgroundColor: '#f0f0f0'
    }}>
      <div style={{
        borderRadius: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        backgroundColor: 'white',
        textAlign: 'center',
        width: '400px' // Adjust the width as needed
      }}>
        <img src={user.imgPath} alt={`${user.username}'s avatar`} style={{
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          marginBottom: '20px'
        }} />
        <h1>{user.username}</h1>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <label style={{ marginRight: '10px' }}>Email:</label>
            <label>{user.email}</label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <label style={{ marginRight: '10px' }}>Date of Birth:</label>
            <label>{user.dateOfBirth}</label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <label style={{ marginRight: '10px' }}>Gender:</label>
            <label>{user.gender}</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;