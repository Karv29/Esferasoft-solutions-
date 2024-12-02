import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import productsData from "../data/products.json";
import './styles.css';


const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productsData);
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Starting Price: ${product.startingPrice}</p>
            <p>
              Current Highest Bid: ${product.currentHighestBid || "None yet"}
            </p>
            <Link to={`/products/${product.id}`}>View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
