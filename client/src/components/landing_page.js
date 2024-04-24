import React from 'react';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header>
        <h1>Welcome to Purdue Picks</h1>
        <p>Discover amazing products created by talented individuals</p>
      </header>
      <section className="features">
        <div className="feature">
          <h2>Create and Sell</h2>
          <p>Become a creator and sell your unique products to customers worldwide.</p>
        </div>
        <div className="feature">
          <h2>Discover</h2>
          <p>Explore a wide range of products from different creators.</p>
        </div>
        <div className="feature">
          <h2>Review and Order</h2>
          <p>Leave reviews for products you've purchased and easily manage your orders.</p>
        </div>
      </section>
      <footer>
        <p>Ready to get started? <a href="/login">Login</a> or <a href="/create-account">Create an Account</a></p>
      </footer>
    </div>
  );
};

export default LandingPage;
