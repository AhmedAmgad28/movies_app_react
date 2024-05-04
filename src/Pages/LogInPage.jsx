import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const LogInPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    axios.get('http://localhost:3001/users')
      .then(response => {
        const user = response.data.find(user => user.username === credentials.username);
        if (user && user.password === credentials.password) {
          // Retrieve all loggedInUser entries
          axios.get('http://localhost:3001/loggedInUser')
            .then(loggedInResponse => {
              // Delete each loggedInUser entry one by one
              const deletePromises = loggedInResponse.data.map(loggedInUser => {
                return axios.delete(`http://localhost:3001/loggedInUser/${loggedInUser.id}`);
              });
              // Wait for all delete operations to complete
              Promise.all(deletePromises)
                .then(() => {
                  // Post the user ID to the loggedInUser endpoint
                  axios.post('http://localhost:3001/loggedInUser', { userId: user.id })
                    .then(() => {
                      navigate('/');
                    })
                    .catch(() => {
                      setError('There was an error posting the user ID.');
                    });
                })
                .catch(() => {
                  setError('There was an error deleting the loggedInUser data.');
                });
            })
            .catch(() => {
              setError('There was an error retrieving the loggedInUser data.');
            });
        } else {
          setError('The username or password is not correct.');
        }
      })
      .catch(() => {
        setError('There was an error processing your request.');
      });
  };
  
  

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="container" style={{ marginTop: '20px' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username:</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={credentials.username}
            style={{ width: '50%', margin: '0 auto' }}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={credentials.password}
            style={{ width: '50%', margin: '0 auto' }}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary">Log In</button>
      </form>
      {error && <p className="text-danger mt-3">{error}</p>}
      <p className="mt-3">Don't have an account? <a href="#" onClick={handleRegister}>Register</a></p>
    </div>
  );
}

export default LogInPage;