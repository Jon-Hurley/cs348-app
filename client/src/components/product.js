import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from './auth_context.js';

const ProductPage = () => {
  const { productID } = useParams();
  const [product, setProduct] = useState({});
  const { userID } = useContext(AuthContext);
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(1); // Default rating is 1
  const [averageRating, setAverageRating] = useState(null); // State to hold average rating

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

  const fetchComments = async () => {
    try {
      const response = await axios.post('http://localhost:8080/getComments', {
        productID: productID
      });
      console.log('Comments in frontend:', response.data);
      setComments(response.data.comments);
      setAverageRating(response.data.averageRating);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handlePurchase = () => {
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

      navigate('/my-orders');
  };

  const handleEdit = () => {
    // Navigate to the edit page
    navigate(`/edit-product/${productID}`);
  };

  const handleAddComment = async () => {
    try {
      await axios.post('http://localhost:8080/addComment', {
        productID: productID,
        userID: userID,
        comment: newComment,
        rating: rating
      });
      alert('Comment added successfully');
      // After adding the comment, refetch comments
      fetchComments();
      // Reset new comment input and rating
      setNewComment('');
      setRating(1);
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Error adding comment');
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchComments();
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
          {userID === product.ID && <button onClick={handleEdit}>Edit</button>}
        </div>
        <div>
          <button onClick={() => navigate('/shop')}>Back to Shop</button>
        </div>
      </div>
      <div className="comments">
        <h3>Comments:</h3>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>
              <p><strong>Author:</strong> {comment.user}</p>
              <p><strong>Comment:</strong> {comment.comment}</p>
              <p><strong>Rating:</strong> {comment.rating}</p>
            </li>
          ))}
        </ul>
        <p><strong>Average Rating:</strong> {averageRating}</p>
        <div>
          <input
            type="text"
            placeholder="Add your comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <select value={rating} onChange={(e) => setRating(parseInt(e.target.value))}>
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
          <button onClick={handleAddComment}>Add Comment</button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
