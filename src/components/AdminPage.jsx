import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import productsData from "../data/products.json";
import { useAuth } from "../context/AuthContext";
import './styles.css';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setProducts(
      productsData.map((product) => ({
        ...product,
        sold: false,
        highestBidder: null,
      }))
    );
  }, []);

  const markAsSold = (productId, highestBidder) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, sold: true, highestBidder }
          : product
      )
    );
  };

  const handleLogout = () => {
    logout();
    navigate("/");  // Redirect to Login page after logout
  };

  return (
    <div className="admin-page">
      <h2>Admin Dashboard</h2>
      <p>Welcome, {username}!</p>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
      {products.map((product) => (
        <div key={product.id} className="admin-product">
          <h3>{product.name}</h3>
          <p>Description: {product.description}</p>
          <p>Starting Price: ${product.startingPrice}</p>
          <p>
            Current Highest Bid: $
            {product.currentHighestBid || "No bids yet"}
          </p>
          {product.sold ? (
            <p>
              <strong>Sold to: {product.highestBidder}</strong>
            </p>
          ) : (
            <>
              <h4>Bid History:</h4>
              <ul>
                {product.bids && product.bids.length > 0 ? (
                  product.bids.map((bid, index) => (
                    <li key={index}>
                      {bid.name}: ${bid.amount}
                    </li>
                  ))
                ) : (
                  <li>No bids yet.</li>
                )}
              </ul>
              {product.bids && product.bids.length > 0 && (
                <div>
                  <select
                    onChange={(e) =>
                      markAsSold(product.id, e.target.value)
                    }
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select Highest Bidder
                    </option>
                    {product.bids.map((bid, index) => (
                      <option key={index} value={bid.name}>
                        {bid.name} - ${bid.amount}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminPage;
