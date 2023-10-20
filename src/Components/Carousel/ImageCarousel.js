import React, { useState, useEffect } from 'react';
import Coffee1 from '../../assets/Carousual_Images/Coffee 1.jpg';
import Coffee2 from '../../assets/Carousual_Images/Coffee 2.webp';
import Coffee3 from '../../assets/Carousual_Images/Coffee 3.jpg';
import Coffee4 from '../../assets/Carousual_Images/Coffee 4.jpg';
import Coffee5 from '../../assets/Carousual_Images/Coffee 5.webp';
import Coffee6 from '../../assets/Carousual_Images/Coffee 6.webp';
import Coffee7 from '../../assets/Carousual_Images/Coffee 7.webp';
import Coffee8 from '../../assets/Carousual_Images/Coffee 8.webp';
import Coffee9 from '../../assets/Carousual_Images/Coffee.jpg';
import Coffee10 from '../../assets/Carousual_Images/Coffee.png';
import Coffee11 from '../../assets/Carousual_Images/Coffee.webp';
import Coffee12 from '../../assets/Carousual_Images/Coffee.webp';

const images = [
  Coffee1,
  Coffee2,
  Coffee3,
  Coffee4,
  Coffee5,
  Coffee6,
  Coffee7,
  Coffee8,
  Coffee9,
  Coffee10,
  Coffee11,
  Coffee12,
];

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);

  const handleView = (product) => {
    setSelectedProduct(product);
  };

  const handleUpdate = (product) => {
    // Make an API call to update the product (use PUT or PATCH request)
    fetch(`https://fakestoreapi.com/products/${product.id}`, {
      method: 'PUT', // Use the appropriate HTTP method (PUT or PATCH)
      body: JSON.stringify(product), // You should update the product data here
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Product updated:', data);
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = (product) => {
    // Make an API call to delete the product (use DELETE request)
    // Then, display data (either on console or alert)
    fetch(`https://fakestoreapi.com/products/${product.id}`, {
      method: 'DELETE',
    })
      .then(() => {
        console.log('Product deleted:', product);
        // Update the products state to remove the deleted product from the table
        setProducts((prevProducts) =>
          prevProducts.filter((p) => p.id !== product.id)
        );
      })
      .catch((error) => console.error(error));
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="landing-page">
      <div className="carousel">
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="carousel-image"
        />
      </div>
      <div className="create-product">
        <h2>Product List</h2>
        <input
          type="text"
          placeholder="Search Product"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <table className="product-table">
          <thead>
            <tr>
              <th>Product Title</th>
              <th>Product Price</th>
              <th>Product Description</th>
              <th>Product Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
                <td>{product.category}</td>
                <td>
                  <button onClick={() => handleView(product)} className="action-button">
                    View
                  </button>
                  <button onClick={() => handleUpdate(product)} className="action-button update-button">
                    Update
                  </button>
                  <button onClick={() => handleDelete(product)} className="action-button delete-button">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedProduct && (
        <div className="product-details-dialog">
          <h2>Product Details</h2>
          <p>Title: {selectedProduct.title}</p>
          <p>Price: {selectedProduct.price}</p>
          <p>Description: {selectedProduct.description}</p>
          <p>Category: {selectedProduct.category}</p>
          <button onClick={() => setSelectedProduct(null)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default Carousel;
