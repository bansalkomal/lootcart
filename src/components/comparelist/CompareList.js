import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Heart, ArrowLeft, ShoppingCart, Trash2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const CompareList = () => {
  let navigate = useNavigate();
  const location = useLocation();
  // const { products } = location.state || {}; 
  // const products = JSON.parse(localStorage.getItem("compareProducts")) || [];
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("compareProducts")) || [];
    setProducts(storedProducts);
  }, []);

  const handleMoveToHome = () => {
    navigate("/dashboard");
  };

  const handleRemoveProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem("compareProducts", JSON.stringify(updatedProducts));
  };

  if (!products || products.length === 0) {
    return (
      <div className="container mt-4">
        <div className="d-flex align-items-center">
          <button className="btn btn-light me-3 back-btn" onClick={handleMoveToHome}>
            <ArrowLeft size={20} /> Back
          </button>
          <h1 className="text-center flex-grow-1 mb-1">COMPARE PRODUCTS</h1>
        </div>
        <p>No products to compare.</p>
      </div>
    );
  }

  const maxProducts = products.slice(0, 3);

  
  return (
    <div className="container mt-4">

      <div className="d-flex align-items-center pb-2">
        <button className="btn btn-light me-3 back-btn" onClick={handleMoveToHome}>
          <ArrowLeft size={20} /> Back
        </button>
        <h1 className="text-center flex-grow-1 mb-1">COMPARE PRODUCTS</h1>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th style={{backgroundColor: 'black'}}>Feature</th>
              {maxProducts.map((product) => (
                <th style={{backgroundColor: 'black', position: 'relative', paddingTop: '10px', paddingBottom: '10px'}} key={product.id}>
                  <span>{product.name}</span>
                <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemoveProduct(product.id)}
                    style={{ position: 'absolute', right: '10px', top: '5px', padding: '5px' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Image</td>
              {maxProducts.map((product) => (
                <td key={product.id}>
                  <img src={product?.imageUrl} alt={product.name} className="img-fluid" style={{ maxHeight: '150px' }} />
                </td>
              ))}
            </tr>
            <tr>
              <td>Price</td>
              {maxProducts.map((product) => (
                <td key={product.id}>${product.price}</td>
              ))}
            </tr>
            <tr>
              <td>Brand</td>
              {maxProducts.map((product) => (
                <td key={product.id}>{product.brand}</td>
              ))}
            </tr>
            {/* <tr>
              <td>Rating</td>
              {maxProducts.map((product) => (
                <td key={product.id}>{product.rating} / 5</td>
              ))}
            </tr> */}
            <tr>
              <td>Description</td>
              {maxProducts.map((product) => (
                <td key={product.id}>{product.description}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompareList;
