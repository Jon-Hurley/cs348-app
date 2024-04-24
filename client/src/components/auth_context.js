// import React, { createContext, useContext, useState } from 'react';

// // Create a context for managing user authentication state
// const AuthContext = createContext();

// // Custom hook to access the authentication context
// export const useAuth = () => useContext(AuthContext);

// // AuthProvider component to wrap your application and provide authentication context
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // Initially, no user is logged in

//   // Function to set the logged-in user
//   const login = (userData) => {
//     setUser(userData);
//   };

//   // Function to log out the user
//   const logout = () => {
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

// Create the AuthContext
export const AuthContext = createContext();

// Custom hook to access the authentication context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userID, setUserID] = useState(null);
  const [username, setUsername] = useState('');
  const [isCreator, setIsCreator] = useState(false);

  // Function to delete user
//   const deleteUser = async (username) => {
//     try {
//       const response = await axios.post('http://localhost:8080/deleteUser', { username });
//       return response.data;
//     } catch (error) {
//       throw new Error('Error deleting user');
//     }
//   };

  // Function to change password
//   const changePassword = async (username, newPassword) => {
//     try {
//       const response = await axios.post('http://localhost:8080/changePassword', { username, password: newPassword });
//       return response.data;
//     } catch (error) {
//       throw new Error('Error changing password');
//     }
//   };

  // Function to handle login
  const login = async (ID, username, isCreator) => {
    try {
    //   const response = await axios.post('http://localhost:8080/login', { username: username, password: password });
    //   const userData = response.data;
      setUserID(ID);
      setUsername(username);
      setIsCreator(isCreator);
      localStorage.setItem('userID', ID);
      localStorage.setItem('username', username);
      localStorage.setItem('isCreator', isCreator);
      const userData = {ID, username, isCreator};
      return userData;
    } catch (error) {
        console.log('error:', error);
      throw new Error('Invalid username or password');
    }
  };

  // Function to logout
  const logout = () => {
    setUserID(null);
    setUsername('');
    setIsCreator(false);
    localStorage.removeItem('userID');
    localStorage.removeItem('username');
    localStorage.removeItem('isCreator');
  };

  useEffect(() => {
    const ID = localStorage.getItem('userID');
    const username = localStorage.getItem('username');
    const isCreator = localStorage.getItem('isCreator');
    if (ID && username && isCreator) {
      setUserID(ID);
      setUsername(username);
      setIsCreator(isCreator);
    }
  }
    , []);

  return (
    <AuthContext.Provider value={{ userID, username, isCreator, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
