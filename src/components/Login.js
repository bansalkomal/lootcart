import { ArrowLeft } from 'lucide-react';
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = ({ onLogin, onSwitchToSignUp, handleBackLogin }) => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('jyoti@gmail.com');
  const [password, setPassword] = useState('jyoti');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email, password);
    } else {
      alert('Please fill in both fields');
    }
  };

  const handleMoveToHome = () => {
    navigate(-1)
  }

  return (
    <Container className="login-container d-flex justify-content-center align-items-center vh-100" style={{position: "relative"}}>
      <button className="btn btn-light me-3 back-btn" onClick={handleMoveToHome}>
          <ArrowLeft size={20} /> Back
        </button>
      <Row className="w-100 justify-content-center">
        <Col md={4}>
          <h2 className="text-center mb-4">Login jjj</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </Form.Group>
            <Button className="w-100" variant="primary" type="submit">
              Login
            </Button>
          </Form>
          <p className="text-center mt-3">
            Don't have an account?{' '}
            <Button variant="link" onClick={onSwitchToSignUp}>
              Sign Up
            </Button>
          </p>
        </Col>
      </Row>
        <Button 
            variant="outline-primary" 
            style={{position: "absolute", top: "20px", left: 0}}
            onClick={handleBackLogin}
        >
            <FaArrowLeft /> Back
        </Button>
    </Container>
  );
};

export default Login;
