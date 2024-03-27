import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ProductsPage = () => {
  // State to track the current page
  const navigate = useNavigate();
  const location = useLocation();
  const { userID, products } = location.state;
  console.log('Products:', products);
  const [currentPage, setCurrentPage] = useState(1);
  // State to track the number of products per page
  const productsPerPage = 5;

  // Calculate the total number of pages
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Get the products for the current page
  const currentProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  console.log('Current products:', currentProducts);

  return (
    <div className="products-page">
      <h2>Products on Trade Trove</h2>
      <div className="product-list">
        {currentProducts.map((product, index) => (
          <div key={index} className="product">
            <h3>{product.Name}</h3>
            <p>Description: {product.Description}</p>
            <p>Price: ${product.Price}</p>
            <img src={product.Image} alt={product.name} />
          </div>
        ))}
      </div>
      {/* Pagination */}
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
    </div>
  );
};

export default ProductsPage;
