import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateAccount = ({}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isCreator, setIsCreator] = useState(false);
  let userID = 0;
  const navigate = useNavigate();

  const handleCreateAccount = (e) => {
    e.preventDefault();
    // Here you would typically send the create account data to your backend for processing
    // For simplicity, I'm just logging the username and password to the console
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    console.log('Is Creator:', isCreator);
    
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    axios.post('http://localhost:8080/createUser', {
        username: username,
        password: password,
        isCreator: isCreator
    }).then((res) => {
      console.log(res);
      if (res.data.message === 'User created') {
        // onCreateAccount();
        // user.username = username;
        // user.isCreator = isCreator;
        userID = res.data.ID;
        navigate('/account', {state: {ID: userID, username: username, isCreator: isCreator}});
      }
      else {
        alert('Error creating user');
      }
    }
    );
    // You can replace the above console.log statements with code to send create account data to your backend
    // For example, using fetch or Axios to make a POST request to your server
    // Remember to handle the response from the server appropriately (e.g., redirect on success, display error message on failure)
    // For now, I'm assuming a successful account creation and calling the onCreateAccount prop
    // onCreateAccount();

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
    </div>
  );
};

export default CreateAccount;
