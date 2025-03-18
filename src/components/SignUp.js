import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';

const SignUp = ({ onSignUp, onSwitchToLogin, handleBackLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user'); // New state to handle role selection

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
    } else {
      onSignUp(email, password, role); // Passing role to onSignUp
    }
  };

  return (
    <Container className="signup-container d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100 justify-content-center">
        <Col md={4}>
          <h2 className="text-center mb-4">Sign Up</h2>
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
                placeholder="Create a password"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password:</Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
              />
            </Form.Group>

            {/* New Role Selection */}
            <Form.Group className="mb-3">
              <Form.Label>Sign up as:</Form.Label>
              <Form.Select 
                value={role} 
                onChange={(e) => setRole(e.target.value)} 
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>

            <Button className="w-100" variant="success" type="submit">
              Sign Up
            </Button>
          </Form>
          <p className="text-center mt-3">
            Already have an account?{' '}
            <Button variant="link" onClick={onSwitchToLogin}>
              Login
            </Button>
          </p>
        </Col>
      </Row>
      <Button 
        variant="outline-primary" 
        style={{ position: "absolute", top: "20px", left: "20px" }}
        onClick={handleBackLogin}
      >
        <FaArrowLeft /> Back
      </Button>
    </Container>
  );
};

export default SignUp;
