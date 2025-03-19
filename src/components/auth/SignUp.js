import React, { useState } from 'react';
import { useNavigate } from "react-router";
import { ArrowLeft } from 'lucide-react';
import { Button, Form } from 'react-bootstrap';

const SignUp = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [gender, setGender] = useState('female');
    const [error, setError] = useState('');

    const handleBack = () => {
        navigate(-1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        // Here, you would send the complete payload to your API.
        const payload = {
            username,
            email,
            password,
            mobileNumber,
            gender,
            role: 'user'
        };

        console.log('Signup Payload:', payload);
        alert("Successfully signed up!");
        setError('');
        // Redirect to login/dashboard as per your flow.
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            {/* <button className="btn btn-light me-3 back-btn" onClick={handleBack}>
                <ArrowLeft size={20} /> Back
            </button> */}
            <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
                <h3 className="text-center mb-3">Sign Up</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="mobile" className="form-label">Mobile Number</label>
                        <input
                            type="text"
                            className="form-control"
                            id="mobile"
                            placeholder="Enter your mobile number"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Gender</label>
                        <select
                            className="form-select"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="alert alert-danger py-1 text-center">{error}</div>}
                    <button type="submit" className="btn btn-dark w-100">Sign Up</button>
                </form>
                <div className="text-center mt-3">
                    <button
                        className="btn btn-warning w-100"
                        onClick={() => navigate('/')}
                    >
                        Already have an account? Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
