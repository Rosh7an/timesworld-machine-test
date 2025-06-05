import StyledButton from "../components/StyledButton";
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
          <Card
            style={{
              width: "100%",
              maxWidth: "400px",
              border: "none",
              display: "flex",
              alignItems: "start",
            }}
          >
            <Card.Body style={{ width: "100%" }}>
              <h2 style={{ marginBottom: "20px",fontFamily:"sans-serif",fontWeight:"700" }}>Sign In</h2>

              {/* New User link */}
              <div className="text-center mb-3">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <span style={{ fontSize: 18, fontWeight: 600 }}>
                    New User?
                  </span>
                  <span
                    style={{
                      fontSize: 14,
                      color: "blue",
                      cursor: "pointer",
                    }}
                  >
                    Create an account
                  </span>
                </div>
              </div>

              {/* Sign-in form */}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                  <Form.Control
                    type="email"
                    placeholder="Username or email"
                    style={{fontWeight:500}}
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
                    style={{fontWeight:500}}
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
                  <StyledButton
                    variant="primary"
                    type="submit"
                    title="Sign In"
                    style={{ width: "100%" }}
                  />
                </div>
              </Form>

              <div className="d-flex align-items-center my-4">
                <div
                  style={{ flex: 1, height: "1px", backgroundColor: "#ccc" }}
                ></div>
                <div
                  style={{
                    margin: "0 15px",
                    color: "#888",
                    whiteSpace: "nowrap",
                  }}
                >
                  or sign in with
                </div>
                <div
                  style={{ flex: 1, height: "1px", backgroundColor: "#ccc" }}
                ></div>
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
