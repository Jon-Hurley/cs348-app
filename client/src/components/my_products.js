import axios from 'axios';
import React, { useState } from 'react';

const PublishProductPage = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    image: null
  });

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductData({ ...productData, [name]: value });
  };

  // Handle file input change
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setProductData({ ...productData, image: file });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle form submission, e.g., sending data to the server
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
      name: '',
      description: '',
      price: '',
      image: null
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
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileInputChange}
            required
          />
        </div>
        <button type="submit">Publish</button>
      </form>
    </div>
  );
};

export default PublishProductPage;
