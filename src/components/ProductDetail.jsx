import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import productsData from "../data/products.json";
import { useAuth } from "../context/AuthContext";
import "./styles.css";

const ProductDetails = () => {
  const { id } = useParams();
  const { username } = useAuth();
  const [product, setProduct] = useState(null);
  const [bidAmount, setBidAmount] = useState("");

  useEffect(() => {
    const selectedProduct = productsData.find((product) => product.id === parseInt(id));
    setProduct(selectedProduct);
  }, [id]);

  const handleBid = () => {
    if (product && parseInt(bidAmount) > (product.currentHighestBid || product.startingPrice)) {
      const newBids = [...product.bids, { name: username, amount: parseInt(bidAmount) }];
      setProduct({
        ...product,
        bids: newBids,
        currentHighestBid: parseInt(bidAmount),
      });
      alert("Your bid has been placed!");
    } else {
      alert("Bid must be higher than the current highest bid!");
    }
  };

  if (!product) return <p>Loading product...</p>;

  return (
    <div className="product-details">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Starting Price: ${product.startingPrice}</p>
      <p>Current Highest Bid: ${product.currentHighestBid || "None yet"}</p>
      <h4>Bid History:</h4>
      <ul>
        {product.bids && product.bids.length > 0 ? (
          product.bids.map((bid, index) => (
            <li key={index}>{bid.name}: ${bid.amount}</li>
          ))
        ) : (
          <li>No bids yet.</li>
        )}
      </ul>
      <input
        type="number"
        placeholder="Enter your bid"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
        className="bid-input"
      />
      <button onClick={handleBid} className="bid-button">
        Place Bid
      </button>
    </div>
  );
};

export default ProductDetails;
