import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './auth_context.js';

const MyProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;
  const { userID, isCreator } = useContext(AuthContext);

  const fetchProducts = async () => {
    try {
      const response = await axios.post('http://localhost:8080/getProductsByCreator', {
        userID: userID
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.post('http://localhost:8080/deleteProduct', {
        ID: productId
      });
      const updatedProducts = products.filter(product => product.ID !== productId);
      setProducts(updatedProducts);
      alert('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product');
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/shop/${productId}`);
  };

  return (
    <div className="products-page">
      <h2>Products Created by You</h2>
      {products.length === 0 ? (
        <p>No products to display.</p>
      ) : (
        <>
          <div className="product-list">
            {products
              .slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)
              .map((product, index) => (
                <div key={index} className="product">
                  <h3>{product.Name}</h3>
                  <p>Description: {product.Description}</p>
                  <p>Price: ${product.Price}</p>
                  <button onClick={() => handleDeleteProduct(product.ID)}>Delete</button>
                  <button onClick={() => handleProductClick(product.ID)}>Select</button>
                </div>
              ))}
          </div>
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyProductsPage;
