import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const NewsPage = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1); // Navigate back to the previous page
    };

    return (
        <div className="container mt-5">
            <Button variant="secondary" onClick={handleBackClick} className="mb-3">
                Back
            </Button>
            <h1>News</h1>
            <div className="news-item mt-4">
                <h2>New Collection Launch</h2>
                <p>We are excited to announce the launch of our new collection. Check out the latest trends and styles available now.</p>
            </div>
            <div className="news-item mt-4">
                <h2>Summer Sale</h2>
                <p>Don't miss our summer sale! Enjoy up to 50% off on selected items. Hurry, the offer is valid while stocks last.</p>
            </div>
            <div className="news-item mt-4">
                <h2>Customer Appreciation Day</h2>
                <p>Join us for Customer Appreciation Day and enjoy exclusive discounts and offers. Thank you for being a valued customer.</p>
            </div>
        </div>
    );
};

export default NewsPage;