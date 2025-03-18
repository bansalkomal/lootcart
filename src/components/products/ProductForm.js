import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

const ProductForm = ({ product, onSave, isAdd }) => {
    const [name, setName] = useState(product?.name || '');
    const [price, setPrice] = useState(product?.price || '');
    const [size, setSize] = useState(product?.size || '');
    const [color, setColor] = useState(product?.color || '');
    const [image, setImage] = useState(product?.image || '');
    const [description, setDescription] = useState(product?.description || '');
    const [stock, setStock] = useState(product?.stock || '');
    const [productCode, setProductCode] = useState(product?.productCode || '');
    const [brand, setBrand] = useState(product?.brand || '');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedProduct = { ...product, name, price, size, color, image, description, stock,productCode, brand };
        onSave(updatedProduct);
        navigate('/dashboard');
    };

    return (
        <div className="container mt-5">
            <h1>{product ? 'Update Product' : 'Add Product'}</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter product name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter product price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formSize">
                    <Form.Label>Size</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter product size"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formColor">
                    <Form.Label>Color</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter product color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter product description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </Form.Group>

                {isAdd && <Form.Group className="mb-3" controlId="formBrand">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter product brand"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        required
                    />
                </Form.Group> }

                {isAdd && <Form.Group className="mb-3" controlId="formProductCode">
                    <Form.Label>Code</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter product code"
                        value={productCode}
                        onChange={(e) => setProductCode(e.target.value)}
                        required
                    />
                </Form.Group> }

                {isAdd && <Form.Group className="mb-3" controlId="formStock">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter product stock"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        required
                    />
                </Form.Group> }

                {isAdd && <Form.Group className="mb-3" controlId="formImage">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter product image URL"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                    />
                </Form.Group> }

                <Button variant="primary" type="submit">
                    {product ? 'Update Product' : 'Add Product'}
                </Button>
            </Form>
        </div>
    );
};

export default ProductForm;