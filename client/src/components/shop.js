import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('price'); // Default sort option is price
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
        sortOption: sortOption,
        sortOrder: sortOrder
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch products when the component mounts
  }, [productNameFilter, creatorUsernameFilter, sortOption, sortOrder]); // Fetch products when the search filters or sorting options change

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSort = () => {
    // Toggle sorting order when the sort button is clicked
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSortOptionChange = (e) => {
    setSortOption(e.target.value);
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
        <select value={sortOption} onChange={handleSortOptionChange}>
          <option value="price">Sort by Price</option>
          <option value="rating">Sort by Rating</option>
        </select>
        <button onClick={handleSort}>
          {sortOrder === 'asc' ? 'Low to High' : 'High to Low'}
        </button>
      </div>
      <div className="product-list">
        {currentProducts.map((product, index) => (
          <div key={index} className="product">
            <h3>{product.Name}</h3>
            <p>Description: {product.Description}</p>
            <p>Price: ${product.Price}</p>
            <p>Rating: {product.avgRating}</p>
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
