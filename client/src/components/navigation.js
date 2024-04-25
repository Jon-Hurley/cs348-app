import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {

    const navigate = useNavigate();
  return (
    <div className="navigation">
      {/* Button to navigate to the account page */}
      <button onClick={() => navigate('/account')}>Account</button>
    </div>
  );
};

export default Navigation;
