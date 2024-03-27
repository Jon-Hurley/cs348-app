import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = ({user}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    // Here you would typically send the login data to your backend for authentication
    // For simplicity, I'm just logging the username and password to the console
    console.log('Username:', username);
    console.log('Password:', password);
    axios.post('http://localhost:8080/login', {
        username: username,
        password: password
    }).then((res) => {
      console.log(res);
      if (res.data.message === 'Logged in') {
        console.log('res.data', res.data);
        user.username = username;
        user.isCreator = res.data.isCreator;
        console.log('isCreator:', res.data.isCreator);
        console.log('User ID:', res.data.ID);
        navigate('/account' , {state: {ID: res.data.ID, username: username, isCreator: res.data.isCreator}});
     }
      else {
        alert('Invalid username or password');
      }
    }
    );
    // You can replace the above console.log statements with code to send login data to your backend
    // For example, using fetch or Axios to make a POST request to your server
    // Remember to handle the response from the server appropriately (e.g., redirect on success, display error message on failure)
    // For now, I'm assuming a successful login and calling the onLogin prop
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
