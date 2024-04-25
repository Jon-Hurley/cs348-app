import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc'); // Default sorting order is ascending
  const [productNameFilter, setProductNameFilter] = useState('');
  const [creatorUsernameFilter, setCreatorUsernameFilter] = useState('');
  const productsPerPage = 5;

  const handleProductClick = (productId) => {
    navigate(`/shop/${productId}`);
  };

  const fetchProducts = async () => {
    try {
      console.log('Filtering products:', productNameFilter, creatorUsernameFilter);
      const response = await axios.post('http://localhost:8080/getAllProducts', {
        productName: productNameFilter,
        creatorUsername: creatorUsernameFilter,
        sortOrder: sortOrder // Send the sorting order to the backend
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Handle error, e.g., show an error message or navigate to an error page
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch products when the component mounts
  }, [productNameFilter, creatorUsernameFilter, sortOrder]); // Fetch products when the search filters or sorting order change

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSort = () => {
    // Toggle sorting order when the sort button is clicked
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const currentProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="products-page">
      <h2>Products on Purdue Picks</h2>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by Product Name"
          value={productNameFilter}
          onChange={(e) => setProductNameFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by Creator Username"
          value={creatorUsernameFilter}
          onChange={(e) => setCreatorUsernameFilter(e.target.value)}
        />
      </div>
      <div className="sorting">
        <button onClick={handleSort}>
          {sortOrder === 'asc' ? 'Sort by Price (Low to High)' : 'Sort by Price (High to Low)'}
        </button>
      </div>
      <div className="product-list">
        {currentProducts.map((product, index) => (
          <div key={index} className="product">
            <h3>{product.Name}</h3>
            <p>Description: {product.Description}</p>
            <p>Price: ${product.Price}</p>
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
    </div>
  );
};

export default ProductsPage;
