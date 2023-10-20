import React from 'react';

function ProductView({ product, handleClose }) {
  if (!product) {
    return null; // If no product is selected, return nothing
  }

  return (
    <div>
      <h2>Product Details</h2>
      <p><strong>Title:</strong> {product.title}</p>
      <p><strong>Price:</strong> {product.price}</p>
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <button onClick={handleClose}>Close</button>
    </div>
  );
}

export default ProductView;
