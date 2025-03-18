import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import '../../assets/styles/applyFilter.css';

const ApplyFilter = ({ show, onClose, onApply, handleClearFilter }) => {
    const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
    const [inStock, setInStock] = useState(false);
    const [color, setColor] = useState('');
    const [brand, setBrand] = useState('');
    const [size, setSize] = useState('');

    // Load filters from localStorage when component mounts
    useEffect(() => {
        const storedFilters = JSON.parse(localStorage.getItem('productFilters'));
        if (storedFilters) {
            setPriceRange(storedFilters.priceRange || { min: 0, max: 10000 });
            setInStock(storedFilters.inStock || false);
            setColor(storedFilters.color || '');
            setBrand(storedFilters.brand || '');
            setSize(storedFilters.size || '');
        }
    }, [show]);

    const handlePriceChange = (e, type) => {
        setPriceRange(prev => ({
            ...prev,
            [type]: Number(e.target.value)
        }));
    };

    const handleApply = () => {
        const filters = { priceRange, inStock, color, brand, size };
        localStorage.setItem('productFilters', JSON.stringify(filters));
        onApply(filters);
        onClose();
    };

    const handleClear = () => {
        localStorage.removeItem('productFilters');
        setPriceRange({ min: 0, max: 10000 });
        setInStock(false);
        setColor('');
        setBrand('');
        setSize('');
        handleClearFilter();
    };

    return (
        <div className={`apply-filter ${show ? 'show' : ''}`}>
            <div className="apply-filter-content">
                <h2>Apply Filters</h2>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Price Range</Form.Label>
                        <div className="d-flex align-items-center">
                            <Form.Control
                                type="number"
                                min="0"
                                max="1000"
                                value={priceRange.min}
                                onChange={(e) => handlePriceChange(e, 'min')}
                                className="me-2"
                            />
                            <span>-</span>
                            <Form.Control
                                type="number"
                                min="0"
                                max="1000"
                                value={priceRange.max}
                                onChange={(e) => handlePriceChange(e, 'max')}
                                className="ms-2"
                            />
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Check
                            type="checkbox"
                            label="In Stock"
                            checked={inStock}
                            onChange={(e) => setInStock(e.target.checked)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Color</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter brand"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Size</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter size"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-between">
                        <Button variant="secondary" onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="secondary" onClick={handleClear}>
                            Clear
                        </Button>
                        <Button variant="primary" onClick={handleApply}>
                            Apply
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default ApplyFilter;
