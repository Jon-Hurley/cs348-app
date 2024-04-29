
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './auth_context.js';
import { useNavigate } from 'react-router-dom';

const PublishProductPage = () => {
  const { userID } = useContext(AuthContext); // Get userID from AuthContext
  console.log('userID in publish_product:', userID);
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    userID: userID,
    name: '',
    description: '',
    price: ''
  });

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductData({ ...productData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Product Data:', productData);
    axios.post('http://localhost:8080/publishProduct', productData)
      .then((res) => {
        console.log(res);
        alert('Product published successfully');
      })
      .catch((err) => {
        console.error(err);
        alert('Error publishing product');
      });
    // Reset the form after submission
    setProductData({
      userID: userID,
      name: '',
      description: '',
      price: ''
    });
  };

  return (
    <div className="publish-product-page">
      <h2>Publish a New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Publish</button>
      </form>
    </div>
  );
};

export default PublishProductPage;
