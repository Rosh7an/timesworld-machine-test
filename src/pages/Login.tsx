import StyledButton from "../components/StyledButton";
import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './LoginStyles.css';


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors: any = {};
    if (!username) errors.username = "Username is required";
    const passwordErrors = [];
    
    if (password.length < 8)
      passwordErrors.push("at least 8 characters long");
    if (!/[A-Z]/.test(password))
      passwordErrors.push("one capital letter");
    if (!/[0-9]/.test(password))
      passwordErrors.push("one number");
    if (!/[!@#$%^&*()_+\-=\]{};':"\\|,.<>?]/.test(password))
      passwordErrors.push("one special character");
    
    if (passwordErrors.length > 0) {
      errors.password = `Password must contain ${passwordErrors.join(", ")}`;
    }
   setErrors(errors);
    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) {
      try {
        navigate("/home", { state: { fromLogin: true } });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Container fluid className="login-container">
      <Row>
        <Col md={6} className="login-form">
          <Card>
            <Card.Body>
              <h2>Sign In</h2>
              <span>
                <h4>New User?</h4>
                <p>Create Account</p>
              </span>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {errors && (errors as any).username && <Form.Text className="text-danger">{(errors as any).username}</Form.Text>}
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors && (errors as any).password && <Form.Text className="text-danger">{(errors as any).password}</Form.Text>}
                </Form.Group>
                <StyledButton variant="primary" type="submit">
                  Login
                </StyledButton>
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
