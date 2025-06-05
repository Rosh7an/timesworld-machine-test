// Login.tsx
import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onSubmit: (username?: string, password?: string) => void;
}
export default function Login({ onSubmit }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate=useNavigate()

  const validateForm = () => {
    const errors: any = {};
    if (!username) errors.username = "Username is required";
    if (!password) errors.password = "Password is required";
    if (password.length < 8)
      errors.password = "Password must be at least 8 characters long";
    if (!/[A-Z]/.test(password))
      errors.password = "Password must contain at least one capital letter";
    if (!/[0-9]/.test(password))
      errors.password = "Password must contain at least one number";
    if (!/[!@#$%^&*()_+\-=\]{};':"\\|,.<>?]/.test(password))
      errors.password = "Password must contain at least one special character";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
    //   onSubmit(username, password);
      navigate('/home');
    }
  };

  return (
<Container fluid className="login-container">
  <Row>
    <Col md={6} className="login-form">
      <Card>
        <Card.Body>
          <h2>Sign In</h2>
          <span><h4>New User?</h4><p>Create Account</p></span>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Col>
    <Col md={6} className="login-background">
      <img src="background-image.jpg" alt="Background Image" />
    </Col>
  </Row>
</Container>
  );
}
