// // import React, { useState, useEffect } from 'react';
// // import { useLocation, useNavigate } from 'react-router-dom';

// // const ProductsPage = () => {
// //   // State to track the current page
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const { userID, products } = location.state;
// //   console.log('Products:', products);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   // State to track the number of products per page
// //   const productsPerPage = 5;

// //   // Calculate the total number of pages
// //   const totalPages = Math.ceil(products.length / productsPerPage);

// //   // Function to handle page change
// //   const handlePageChange = (pageNumber) => {
// //     setCurrentPage(pageNumber);
// //   };

// //   // Get the products for the current page
// //   const currentProducts = products.slice(
// //     (currentPage - 1) * productsPerPage,
// //     currentPage * productsPerPage
// //   );

// //   console.log('Current products:', currentProducts);

// //   return (
// //     <div className="products-page">
// //       <h2>Products on Trade Trove</h2>
// //       <div className="product-list">
// //         {currentProducts.map((product, index) => (
// //           <div key={index} className="product">
// //             <h3>{product.Name}</h3>
// //             <p>Description: {product.Description}</p>
// //             <p>Price: ${product.Price}</p>
// //           </div>
// //         ))}
// //       </div>
// //       {/* Pagination */}
// //       <div className="pagination">
// //         {Array.from({ length: totalPages }, (_, index) => (
// //           <button
// //             key={index}
// //             onClick={() => handlePageChange(index + 1)}
// //             className={currentPage === index + 1 ? 'active' : ''}
// //           >
// //             {index + 1}
// //           </button>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductsPage;


// import React, { useState, useEffect, useContext } from 'react';
// import { AuthContext } from './auth_context.js';
// import { useLocation, useNavigate } from 'react-router-dom';

// const ProductsPage = () => {
//   const { userID } = useContext(AuthContext); // Get userID from AuthContext
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { products } = location.state; // Remove userID from location state
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 5;

//   const totalPages = Math.ceil(products.length / productsPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const currentProducts = products.slice(
//     (currentPage - 1) * productsPerPage,
//     currentPage * productsPerPage
//   );

//   return (
//     <div className="products-page">
//       <h2>Products on Trade Trove</h2>
//       <div className="product-list">
//         {currentProducts.map((product, index) => (
//           <div key={index} className="product">
//             <h3>{product.Name}</h3>
//             <p>Description: {product.Description}</p>
//             <p>Price: ${product.Price}</p>
//           </div>
//         ))}
//       </div>
//       <div className="pagination">
//         {Array.from({ length: totalPages }, (_, index) => (
//           <button
//             key={index}
//             onClick={() => handlePageChange(index + 1)}
//             className={currentPage === index + 1 ? 'active' : ''}
//           >
//             {index + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductsPage;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  const handleProductClick = (productId) => {
    navigate(`/shop/${productId}`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.post('http://localhost:8080/getAllProducts', {
          // You may need to pass any necessary parameters for fetching products
          // For example, userID: userID
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Handle error, e.g., show an error message or navigate to an error page
      }
    };

    fetchProducts(); // Fetch products when the component mounts

    // Cleanup function can be added if necessary
  }, []); // Empty dependency array ensures that the effect runs only once on component mount

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const currentProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="products-page">
      <h2>Products on Purdue Picks</h2>
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
