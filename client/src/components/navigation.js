import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {

    const navigate = useNavigate();
  return (
    <div className="navigation">
      <button onClick={() => navigate('/account')}>Account</button>
    </div>
  );
};

export default Navigation;
