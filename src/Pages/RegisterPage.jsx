import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        imgPath: '',
        dateOfBirth: '',
        gender: '',
        password: ''
      });
    
      const handleFormSubmit = (e) => {
        e.preventDefault();
    
        // Validation
        if (!/^[a-zA-Z0-9]+$/.test(userData.username)) {
          alert('Username must contain characters and numbers only.');
          return;
        }
        if (!/\S+@\S+\.\S+/.test(userData.email)) {
          alert('Email must be a valid email address.');
          return;
        }
        if (!userData.imgPath.endsWith('.png') && !userData.imgPath.endsWith('.jpg')) {
          alert('Image path must be a link to a PNG or JPG image.');
          return;
        }
        if (new Date().getFullYear() - new Date(userData.dateOfBirth).getFullYear() < 16) {
          alert('You must be older than 16 years.');
          return;
        }
        if (!['male', 'female'].includes(userData.gender)) {
          alert('Gender must be either male or female.');
          return;
        }
        if (userData.password.length < 8) {
          alert('Password must be at least 8 characters long.');
          return;
        }
        if (userData.password !== userData.confirmPassword) {
            alert('The passwords do not match.');
            return;
        }
    
        axios
          .post('http://localhost:3001/users', userData)
          .then(() => {
            console.log('User registered successfully.');
            navigate('/');
          })
          .catch((error) => {
            console.error(error);
            alert('Registration failed.');
          });
      };
    
      return (
        <div className="container" style={{ marginTop: '20px' }}>
            <h1>Register User</h1>
            <form onSubmit={handleFormSubmit} className="form-horizontal">
            <div className="form-group row" style={{ marginTop: '20px' }}>
        <label className="col-sm-3 col-form-label">Username:</label>
        <div className="col-sm-9">
            <input
            type="text"
            className="form-control"
            value={userData.username}
            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
            required
            />
        </div>
        </div>

        <div className="form-group row" style={{ marginTop: '20px' }}>
        <label className="col-sm-3 col-form-label">Email:</label>
        <div className="col-sm-9">
            <input
            type="email"
            className="form-control"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            required
            />
        </div>
        </div>

        <div className="form-group row" style={{ marginTop: '20px' }}>
        <label className="col-sm-3 col-form-label">Image Path:</label>
        <div className="col-sm-9">
            <input
            type="text"
            className="form-control"
            value={userData.imgPath}
            onChange={(e) => setUserData({ ...userData, imgPath: e.target.value })}
            required
            />
        </div>
        </div>

        <div className="form-group row" style={{ marginTop: '20px' }}>
        <label className="col-sm-3 col-form-label">Date of Birth:</label>
        <div className="col-sm-9">
            <input
            type="date"
            className="form-control"
            value={userData.dateOfBirth}
            onChange={(e) => setUserData({ ...userData, dateOfBirth: e.target.value })}
            required
            />
        </div>
        </div>

        <div className="form-group row" style={{ marginTop: '20px' }}>
        <label className="col-sm-3 col-form-label">Gender:</label>
        <div className="col-sm-9">
            <select
            className="form-control"
            value={userData.gender}
            onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
            required
            >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            </select>
        </div>
        </div>

        <div className="form-group row" style={{ marginTop: '20px' }}>
        <label className="col-sm-3 col-form-label">Password:</label>
        <div className="col-sm-9">
            <input
            type="password"
            className="form-control"
            value={userData.password}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            required
            />
        </div>

        <div className="form-group row" style={{ marginTop: '20px' }}>
            <label className="col-sm-3 col-form-label">Confirm Password:</label>
            <div className="col-sm-9">
                <input
                type="password"
                className="form-control"
                onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
                required
                />
            </div>
        </div>

        </div>
                <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>Register</button>
            </form>
        </div>
      );
}

export default RegisterPage;
