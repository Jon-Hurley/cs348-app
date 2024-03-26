import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AccountPage = ({ user }) => {
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handleDeleteAccount = () => {
    // Call the onDeleteAccount function passed as a prop
    axios.post('http://localhost:8080/deleteUser', {
        username: user.username
    }).then((res) => {
      console.log(res);
      if (res.data.message === 'User deleted') {
        user.username = '';
        user.isCreator = false;
        alert('Account deleted');
        navigate('/');
      }
      else {
        alert('Error deleting user');
      }
    }
    );
  };

  const handleUpdatePassword = () => {
    // Call the onUpdatePassword function passed as a prop
    // Reset the newPassword state
    axios.post('http://localhost:8080/changePassword', {
        username: user.username,
        password: newPassword
    }).then((res) => {
      console.log(res);
      if (res.data.message === 'Password changed') {
        alert('Password changed');
      }
      else {
        alert('Error changing password');
      }
    }
    );
  };

  return (
    <div className="account-page">
      <h2>Account Information</h2>
      <div>
        <strong>Username:</strong> {user.username}
      </div>
      <div>
        <strong>Creator:</strong> {user.isCreator ? 'Yes' : 'No'}
      </div>
      <div>
        <button onClick={handleDeleteAccount}>Delete Account</button>
      </div>
      <div>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={handleUpdatePassword}>Update Password</button>
      </div>
    </div>
  );
};

export default AccountPage;
