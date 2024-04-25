import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './auth_context';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const OrdersPage = () => {
  const { userID } = useContext(AuthContext);
  const navigate = useNavigate(); // Get the navigate function

  console.log('UserID at start:', userID);
  const [orders, setOrders] = useState([]);
  const [aggregateOrders, setAggregateOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAggregateOrders = async () => {
      try {
        const response = await axios.post('http://localhost:8080/getAggregateOrdersByUser', {
          userID: userID
        });

        console.log('UserID:', userID);

        console.log('Orders in frontend:', response.data);
      
        setAggregateOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await axios.post('http://localhost:8080/getOrdersByUser', {
          userID: userID
        });

        console.log('UserID:', userID);

        console.log('Orders in frontend:', response.data);
      
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    }


    fetchOrders();
    fetchAggregateOrders();
  }, [userID]); // Fetch orders when userID changes

  // Function to navigate to the shop
  const navigateToShop = () => {
    navigate('/shop');
  };

  // Function to navigate to a specific product
  const navigateToProduct = (productId) => {
    navigate(`/shop/${productId}`);
  };

  return (
    <div className="orders-page">
      <h2>Your Orders</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="order-list">
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <div>
              <h3>Individual Orders</h3>
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Order Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.product}>
                    <td>
                      {/* Button for each product */}
                      <button onClick={() => navigateToProduct(order.ID)}>
                        {order.product}
                      </button>
                    </td>
                    <td>{order.price}</td>
                    <td>{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3>Order Aggregates</h3>
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {aggregateOrders.map(order => (
                  <tr key={order.product}>
                    <td>
                      {/* Button for each product */}
                      <button onClick={() => navigateToProduct(order.ID)}>
                        {order.product}
                      </button>
                    </td>
                    <td>{order.quantity}</td>
                    <td>{order.price}</td>
                    <td>{parseFloat(order.quantity * order.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          )}
        </div>
      )}
      {/* Button to navigate to the shop */}
      <button onClick={navigateToShop}>Go to Shop</button>
    </div>
  );
};

export default OrdersPage;
