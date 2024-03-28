import React from 'react';

const ProductPage = ({ product, reviews }) => {
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
      </div>
      <div className="reviews">
        <h3>Reviews</h3>
        {reviews.map((review, index) => (
          <div key={index} className="review">
            <div>
              <strong>Rating:</strong> {review.rating}
            </div>
            <div>
              <strong>Comment:</strong> {review.comment}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
