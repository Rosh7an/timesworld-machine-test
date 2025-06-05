import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors: any = {};
    if (!username) errors.username = "Username is required";
    const passwordErrors = [];

    if (password.length < 8) passwordErrors.push("at least 8 characters long");
    if (!/[A-Z]/.test(password)) passwordErrors.push("one capital letter");
    if (!/[0-9]/.test(password)) passwordErrors.push("one number");
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
    <Container fluid>
      <Row className="min-vh-100">
        <Col
          md={6}
          className="d-flex justify-content-center align-items-center"
        >
          <Card className="w-100 border-0" style={{ maxWidth: "400px" }}>
            <Card.Body className="w-100">
            <h2 className="mb-4 fw-bold font-sans text-start">Sign In</h2>

              {/* New User link */}
              <div className="mb-3 d-flex align-items-center gap-2">
                <span className="fw-semibold fs-5">New User?</span>
                <span
                  className="fs-6 text-primary"
                  style={{ cursor: "pointer" }}
                >
                  Create an account
                </span>
              </div>

              {/* Sign-in form */}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                  <Form.Control
                    type="email"
                    placeholder="Username or email"
                    className="fw-medium"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {errors && (errors as any).username && (
                    <Form.Text className="text-danger">
                      {(errors as any).username}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group controlId="password" className="mt-3">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    className="fw-medium"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors && (errors as any).password && (
                    <Form.Text className="text-danger">
                      {(errors as any).password}
                    </Form.Text>
                  )}
                </Form.Group>

                {/* Keep me signed in */}
                <div className="d-flex align-items-center mt-3">
                  <input type="checkbox" id="keep-signed-in" />
                  <label htmlFor="keep-signed-in" className="ms-2 mb-0">
                    Keep me signed in
                  </label>
                </div>

                {/* Sign-in button */}
                <div className="d-grid mt-4">
                  <Button variant="dark">Sign In</Button>
                </div>
              </Form>

              <div className="d-flex align-items-center my-4">
                <div className="flex-grow-1 border-top border-secondary-subtle"></div>
                <div className="mx-3 text-muted text-nowrap">
                  or sign in with
                </div>
                <div className="flex-grow-1 border-top border-secondary-subtle"></div>
              </div>

              {/* Social Login Icons */}
              <div className="d-flex justify-content-center gap-5 mb-2">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
                  alt="Google"
                  width={30}
                  height={30}
                  style={{ cursor: "pointer" }}
                />
                <img
                  src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                  alt="Facebook"
                  width={30}
                  height={30}
                  style={{ cursor: "pointer" }}
                />
                <img
                  src="https://cdn-icons-png.flaticon.com/512/145/145807.png"
                  alt="LinkedIn"
                  width={30}
                  height={30}
                  style={{ cursor: "pointer" }}
                />
                <img
                  src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
                  alt="Twitter"
                  width={30}
                  height={30}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Right-side image */}
        <Col
          md={6}
          className="d-flex justify-content-center align-items-center"
        >
          <img
            src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?semt=ais_items_boosted&w=740"
            alt="Background"
            className="img-fluid"
          />
        </Col>
      </Row>
    </Container>
  );
}
