import React from 'react';
import "../../assets/styles/productTile.css";


const ProductTile = ({ product }) => {
  return (
    <div className="product-tile">
      <img src={product?.image} alt={product?.name} className="product-image" />
      <h3 className="product-name">{product?.name}</h3>
      <p className="product-price">${product?.price.toFixed(2)}</p>
      <button className="add-to-cart-button">Add to Cart</button>
      <div className="product-actions">
        <button className="update-product-button">Update Product</button>
        <button className="remove-product-button">Remove Product</button>
      </div>
    </div>
  );
};

export default ProductTile;