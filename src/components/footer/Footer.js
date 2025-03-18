import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();

    const handleNewsClick = () => {
        navigate('/news');
    };

    const handlePrivacyPolicyClick = () => {
        // window.open('/path/to/privacy-policy.pdf', '_blank');
        window.open('/privacy-policy.pdf', '_blank');
    };

    return (
        <footer className="bg-dark text-white py-4 mt-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h5>About Us</h5>
                        <p>We are a leading e-commerce platform providing a wide range of products to our customers. Our mission is to deliver high-quality products at competitive prices.</p>
                    </div>
                    <div className="col-md-4">
                        <h5>Contact Us</h5>
                        <p>Email: support@ecom.com</p>
                        <p>Phone: +1 (800) 234-322-16</p>
                        <p>Address: 123 E-commerce St, Online City, Web</p>
                    </div>
                    <div className="col-md-4">
                        <h5>Follow Us</h5>
                        <p>
                            <a href="#" className="text-white me-2">Facebook</a>
                            <a href="#" className="text-white me-2">Twitter</a>
                            <a href="#" className="text-white me-2">Instagram</a>
                            <a href="#" className="text-white">LinkedIn</a>
                        </p>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12 text-center">
                        <p>&copy; 2025 E-commerce Platform. All rights reserved.</p>
                        <p>
                            <a href="" className="text-white me-2" onClick={handleNewsClick}>News</a>
                            <a href="#" className="text-white" onClick={handlePrivacyPolicyClick}>Privacy Policy</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;