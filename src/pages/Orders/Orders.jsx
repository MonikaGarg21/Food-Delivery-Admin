import React, {useEffect, useState} from "react";
import "./Orders.css";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const BASE_URL = "http://localhost:4000";

  // Update Status
  const updateStatus = async (orderId, status) => {
    try {
      const response = await axios.put(`${BASE_URL}/api/order/updateStatus`, {
        orderId,
        status,
      });

      if (response.data.success) {
        // Instant UI update (no reload feel)
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? {...order, status} : order,
          ),
        );
      }
    } catch (error) {
      console.log("Error updating status:", error);
    }
  };

  useEffect(() => {
    // Fetch Orders
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/order/list`);

        if (response.data.success) {
          setOrders(response.data.data);
        }
      } catch (error) {
        console.log("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="admin-orders">
      <h2>All Orders</h2>

      <div className="orders-container">
        {orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          orders.map((order, index) => (
            <div className="order-card" key={index}>
              {/* Header */}
              <div className="order-header">
                <h3>Order #{order._id.slice(-6)}</h3>

                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                  className={`status-dropdown ${
                    order.status === "Food Proccessing"
                      ? "status-processing"
                      : order.status === "Out for delivery"
                        ? "status-out"
                        : "status-delivered"
                  }`}
                >
                  <option value="Food Proccessing">Food Processing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>

              {/* Items */}
              <div className="order-items">
                {order.items.length === 0 ? (
                  <p>No items</p>
                ) : (
                  order.items.map((item, i) => (
                    <div className="order-item" key={i}>
                      <img
                        src={`${BASE_URL}/images/${item.image}`}
                        alt={item.name}
                      />
                      <div>
                        <p className="item-name">{item.name}</p>
                        <p>Qty: {item.quantity}</p>
                        <p>₹{item.price}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Address */}
              <div className="order-address">
                <p>
                  <strong>
                    {order.address.firstName} {order.address.lastName}
                  </strong>
                </p>
                <p>{order.address.street}</p>
                <p>
                  {order.address.city}, {order.address.state}
                </p>
                <p>{order.address.zipcode}</p>
                <p>{order.address.phone}</p>
              </div>

              {/* Details */}
              <div className="order-details">
                <p>
                  <strong>Total:</strong> ₹{order.amount}
                </p>
                <p>
                  <strong>Date:</strong> {new Date(order.date).toLocaleString()}
                </p>
                <p>
                  <strong>Payment:</strong> {order.payment ? "Paid" : "Pending"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminOrders;