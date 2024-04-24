import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <div className="navigation">
      {/* Button to navigate to the shop */}
      <Link to="/shop">
        <button>Shop</button>
      </Link>
      
      {/* Button to navigate to the account page */}
      <Link to="/account">
        <button>Account</button>
      </Link>
    </div>
  );
};

export default Navigation;
