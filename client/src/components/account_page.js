// import axios from 'axios';
// import React, { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

// const AccountPage = () => {
//   const [newPassword, setNewPassword] = useState('');
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { ID, username, isCreator } = location.state;

//   const handleDeleteAccount = () => {
//     // Call the onDeleteAccount function passed as a prop
//     axios.post('http://localhost:8080/deleteUser', {
//         username: username
//     }).then((res) => {
//       console.log(res);
//       if (res.data.message === 'User deleted') {
//         alert('Account deleted');
//         navigate('/');
//       }
//       else {
//         alert('Error deleting user');
//       }
//     });
//   };

//   const handleUpdatePassword = () => {
//     // Call the onUpdatePassword function passed as a prop
//     // Reset the newPassword state
//     axios.post('http://localhost:8080/changePassword', {
//         username: username,
//         password: newPassword
//     }).then((res) => {
//       console.log(res);
//       if (res.data.message === 'Password changed') {
//         alert('Password changed');
//       }
//       else {
//         alert('Error changing password');
//       }
//     });
//   };

//   const handleLogout = () => {
//     // Implement logout logic here
//     // For example, clear authentication tokens
//     navigate('/login');
//   };

//   const handleCreateProduct = () => {
//     // Navigate to the publish product web page
//     console.log('ID in account:', ID);
//     navigate('/publish-product', {state: {userID: ID, isCreator: isCreator}});
//   };

//   const handleGoToShop = () => {
//     // Navigate to the shop web page
//     axios.post('http://localhost:8080/getAllProducts', {
//         userID: ID
//     }).then((res) => {
//       console.log('res in account_page', res);
//       navigate('/shop', {state: {userID: ID, products: res.data}});
//     });
//   }

//   const handleGoToMyProducts = () => {

//     axios.post('http://localhost:8080/getProductsByCreator', {
//         userID: ID
//     }).then((res) => {
//       console.log('res in account_page', res);
//       navigate('/my-products', {state: {userID: ID, products: res.data}});
//     });
//   }

//   return (
//     <div className="account-page">
//       <h2>Account Information</h2>
//       <div>
//         <strong>Username:</strong> {username}
//       </div>
//       <div>
//         <strong>Creator:</strong> {isCreator ? 'Yes' : 'No'}
//       </div>
//       <div>
//         <button onClick={handleDeleteAccount}>Delete Account</button>
//         <button onClick={handleLogout}>Logout</button>
//       </div>
//       <div>
//         <input
//           type="password"
//           placeholder="New Password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//         />
//         <button onClick={handleUpdatePassword}>Update Password</button>
//         {isCreator && <button onClick={handleCreateProduct}>Create Product</button>}
//         {isCreator && <button onClick={handleGoToMyProducts}>Go to My Products</button>}
//         {<button onClick={handleGoToShop}>Go to Shop</button>}
//       </div>
//     </div>
//   );
// };

// export default AccountPage;
import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from './auth_context.js'; // Import the AuthContext

const AccountPage = () => {
  
  const { userID, username, isCreator, logout } = useContext(AuthContext); // Access context values
  console.log('AuthContext:', userID, username, isCreator);
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleDeleteAccount = () => {
    // Call the onDeleteAccount function passed as a prop
    // Assuming the deleteUser function is available in the AuthContext
    axios.post('http://localhost:8080/deleteUser', {
        username: username
    }).then((res) => {
      console.log(res);
      if (res.data.message === 'User deleted') {
        logout(); // Logout the user after account deletion
        alert('Account deleted');
        navigate('/');
      }
      else {
        alert('Error deleting user');
      }
    });
  };

  const handleLogout = () => {
    // Call the logout function from the AuthContext
    logout();
    navigate('/login');
  };

  useEffect(() => {
    if (!userID) {
      navigate('/login');
    }
  }, [userID]);

  const handleUpdatePassword = () => {
    // Call the onUpdatePassword function passed as a prop
    // Reset the newPassword state
    // Assuming the changePassword function is available in the AuthContext
    // Reset the newPassword state
    axios.post('http://localhost:8080/changePassword', {
        username: username,
        password: newPassword
    }).then((res) => {
      console.log(res);
      if (res.data.message === 'Password changed') {
        alert('Password changed');
      }
      else {
        alert('Error changing password');
      }
    });
  };

  const handleCreateProduct = () => {
    // Navigate to the publish product web page
    navigate('/publish-product');
  };

  const handleGoToShop = () => {
    // Navigate to the shop web page
    navigate('/shop');
  };

  const handleGoToMyProducts = () => {
    // Navigate to the my-products web page
    navigate('/my-products');
  };

  return (
    <div className="account-page">
      <h2>Account Information</h2>
      <div>
        <strong>Username:</strong> {username}
      </div>
      <div>
        <strong>Creator:</strong> {isCreator ? 'Yes' : 'No'}
      </div>
      <div>
        <button onClick={handleDeleteAccount}>Delete Account</button>
        <button onClick={handleLogout}>Logout</button> {/* Use logout function from context */}
      </div>
      <div>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={handleUpdatePassword}>Update Password</button>
        {isCreator && <button onClick={handleCreateProduct}>Create Product</button>}
        {isCreator && <button onClick={handleGoToMyProducts}>Go to My Products</button>}
        <button onClick={handleGoToShop}>Go to Shop</button>
        <button onClick={() => navigate('/my-orders')}>Go to My Orders</button>
      </div>
    </div>
  );
};

export default AccountPage;
