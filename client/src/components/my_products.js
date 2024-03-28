import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const MyProductsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userID, products } = location.state || { products: [] }; // Default to empty array if no products are passed
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteProduct = (productId) => {
    // Handle the deletion of the product with the given productId
    // You can use axios to send a delete request to your backend API
    console.log('Deleting product with ID:', productId);
    // Update the products list after deletion
    // For example, you can refetch the products from the server or remove the product from the state
    axios.post('http://localhost:8080/deleteProduct', {
        ID: productId
    }).then((res) => {
        console.log(res);
        if (res.data.message === 'Product deleted') {
            alert('Product deleted successfully');
            navigate('/my-products', { state: { userID: userID } });
        }
        else {
            alert('Error deleting product');
        }
        }
    );
  };
  
  if (!products) {
    console.log('No products');
    return (
      <div className="products-page">
        <h2>Products Created by You</h2>
        <p>No products to display.</p>
      </div>
    );
  } else {
    console.log('Products in front:', products);
    const currentProducts = products.slice(
      (currentPage - 1) * productsPerPage,
      currentPage * productsPerPage
    );

    return (
      <div className="products-page">
        <h2>Products Created by You</h2>
        {products.length === 0 ? (
          <p>No products to display.</p>
        ) : (
          <>
            <div className="product-list">
              {currentProducts.map((product, index) => (
                <div key={index} className="product">
                  <h3>{product.Name}</h3>
                  <p>Description: {product.Description}</p>
                  <p>Price: ${product.Price}</p>
                  <button onClick={() => handleDeleteProduct(product.ID)}>Delete</button>
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
  }
};

export default MyProductsPage;
