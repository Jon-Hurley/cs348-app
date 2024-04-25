import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from './auth_context.js';

const EditProductPage = () => {
  const { productID } = useParams();
  const [product, setProduct] = useState({});
  const [editedProduct, setEditedProduct] = useState({});
  const { userID } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      const response = await axios.post('http://localhost:8080/getProduct', {
        ID: productID
      });
      console.log('Product in frontend:', response.data);
      setProduct(response.data);
      // Initialize editedProduct with the fetched product
      setEditedProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleEdit = async () => {
    try {
      // Update the product with the edited attributes
      const response = await axios.post('http://localhost:8080/updateProduct', editedProduct);
      console.log('Product updated:', response.data);
      alert('Product updated successfully');
      navigate(`/shop/${productID}`); // Navigate back to the product page
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error updating product');
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  // Handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({
      ...editedProduct,
      [name]: value
    });
  };

  return (
    <div className="edit-product-page">
      <h2>Edit Product</h2>
      <div className="product-details">
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={editedProduct.name || ''} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input type="text" id="price" name="price" value={editedProduct.price || ''} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={editedProduct.description || ''} onChange={handleChange} />
        </div>
        <button onClick={handleEdit}>Save Changes</button>
        <button onClick={() => navigate(`/shop/${productID}`)}>Cancel</button>
      </div>
    </div>
  );
};

export default EditProductPage;
