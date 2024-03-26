import React, { useState } from 'react';

const ProductsPage = () => {
  // Sample products data
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', type: 'Type A', price: 10, creator: 'Creator 1' },
    { id: 2, name: 'Product 2', type: 'Type B', price: 20, creator: 'Creator 2' },
    // Add more products as needed
  ]);

  // Filters state
  const [filters, setFilters] = useState({
    productType: '',
    price: '',
    creator: ''
  });

  // Handle filter changes
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  // Filter products based on current filters
  const filteredProducts = products.filter(product => {
    return (
      (!filters.productType || product.type === filters.productType) &&
      (!filters.price || product.price <= parseInt(filters.price)) &&
      (!filters.creator || product.creator === filters.creator)
    );
  });

  return (
    <div className="product-page">
      <div className="filters">
        <label>
          Product Type:
          <select name="productType" value={filters.productType} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="Type A">Type A</option>
            <option value="Type B">Type B</option>
            {/* Add more options for product types */}
          </select>
        </label>
        <label>
          Price:
          <input type="number" name="price" value={filters.price} onChange={handleFilterChange} />
        </label>
        <label>
          Creator:
          <input type="text" name="creator" value={filters.creator} onChange={handleFilterChange} />
        </label>
      </div>
      <div className="products">
        {filteredProducts.map(product => (
          <div key={product.id} className="product">
            <h3>{product.name}</h3>
            <p>Type: {product.type}</p>
            <p>Price: ${product.price}</p>
            <p>Creator: {product.creator}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
