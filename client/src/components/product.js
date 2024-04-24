import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from './auth_context.js';

const ProductPage = () => {
  const { productID } = useParams();
  const [product, setProduct] = useState({});
  const { userID } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      const response = await axios.post('http://localhost:8080/getProduct', {
        ID: productID
      });
      console.log('Product in frontend:', response.data);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handlePurchase = () => {
    // Add your logic for handling the purchase here
    // For example, you can create an order or navigate to a checkout page
    // navigate('/checkout'); // Example navigation
    axios.post('http://localhost:8080/createOrder', {
      productID: productID,
      userID: userID
    })
      .then(response => {
        console.log('Order created:', response.data);
        alert('Order created successfully');
      })
      .catch(error => {
        console.error('Error creating order:', error);
        alert('Error creating order');
      });

      navigate('/my_orders');
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="product-page">
      <div className="product-details">
        <h2>{product.name}</h2>
        <div>
          <strong>Creator:</strong> {product.creator}
        </div>
        <div>
          <strong>Price:</strong> ${product.price}
        </div>
        <div>
          <strong>Description:</strong> {product.description}
        </div>
        <div>
          <button onClick={handlePurchase}>Purchase</button>
        </div>
        <div>
          <button onClick={() => navigate('/shop')}>Back to Shop</button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
