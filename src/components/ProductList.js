import React, { useState } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';

const ProductList = ({ products, addToCart, addProduct, deleteProduct }) => {
  const [show, setShow] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: ''
  });

  const handleClose = () => {
    setShow(false);
    setIsEditing(false); // Reset editing state
    setNewProduct({ name: '', price: '', image: '' }); // Clear the form
  };
  
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = () => {
    if (isEditing && currentProduct) {
      // Update the existing product
      currentProduct.name = newProduct.name;
      currentProduct.price = newProduct.price;
      currentProduct.image = newProduct.image;
    } else {
      // Add a new product
      addProduct(newProduct);
    }
    handleClose();
  };

  const handleEditProduct = (product) => {
    setIsEditing(true); // Set editing mode
    setCurrentProduct(product); // Store the product being edited
    setNewProduct({ ...product }); // Pre-fill the form with product data
    handleShow();
  };

  return (
    <div>
      <h2 className="mb-3">Products</h2>
      <div className="mb-3">
        <Button variant="success" onClick={handleShow}>Add Product</Button>
      </div>

      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <Card>
              <Card.Img variant="top" src={product.image} style={{ height: '200px' }} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>${product.price}</Card.Text>
                <Button variant="primary" onClick={() => addToCart(product)}>
                  Add to Cart
                </Button>
                <Button
                  variant="danger"
                  className="ml-2 mx-2"
                  onClick={() => deleteProduct(product.id)}
                >
                  Delete
                </Button>
                <Button
                  variant="warning"
                  onClick={() => handleEditProduct(product)}
                >
                  Edit
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Modal for adding or editing a product */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Product' : 'Add Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
                placeholder="Enter price"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={newProduct.image}
                onChange={handleInputChange}
                placeholder="Enter image URL"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddProduct}>
            {isEditing ? 'Update Product' : 'Add Product'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductList;
