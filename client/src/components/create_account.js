


import axios from 'axios';
import React, { useState, useContext } from 'react';
import { AuthContext } from './auth_context.js';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isCreator, setIsCreator] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleCreateAccount = (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    axios.post('http://localhost:8080/createUser', {
      username: username,
      password: password,
      isCreator: isCreator
    }).then((res) => {
      console.log('res in create account', res);
      if (res.data.message === 'User created') {
        // Log in the user after account creation
        login(res.data.ID, username, password); 
        // Navigate to the account page
        navigate('/account');
      } else {
        alert('Error creating user');
      }
    });
  };

  return (
    <div className="create-account-container">
      <h2>Create Account</h2>
      <form onSubmit={handleCreateAccount}>
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
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="is-creator">Are you a creator?</label>
          <input
            type="checkbox"
            id="is-creator"
            checked={isCreator}
            onChange={(e) => setIsCreator(e.target.checked)}
          />
        </div>
        <div className="form-group">
          <button type="submit">Create Account</button>
        </div>
      </form>
      <button onClick={() => navigate('/login')}>Already have an account? Login</button>
      <button onClick={() => navigate('/')}>Return to the landing page</button>
    </div>
  );
};

export default CreateAccount;
