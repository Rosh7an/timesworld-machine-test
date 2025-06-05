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
    if (!username) {
      errors.username = "Username is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+$/;
      if (!emailRegex.test(username)) {
        errors.username = "Invalid email format";
      }
    }
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

              <div className="mb-3 d-flex align-items-center gap-2">
                <span className="fw-semibold fs-5">New User?</span>
                <span
                  className="fs-6 text-primary"
                  style={{ cursor: "pointer" }}
                >
                  Create an account
                </span>
              </div>

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

                <div className="d-flex align-items-center mt-3">
                  <input type="checkbox" id="keep-signed-in" />
                  <label htmlFor="keep-signed-in" className="ms-2 mb-0">
                    Keep me signed in
                  </label>
                </div>

                <div className="d-grid mt-4">
                  <Button variant="dark" onClick={(e: any) => handleSubmit(e)}>
                    Sign In
                  </Button>
                </div>
              </Form>

              <div className="d-flex align-items-center my-4">
                <div className="flex-grow-1 border-top border-secondary-subtle"></div>
                <div className="mx-3 text-muted text-nowrap">
                  or sign in with
                </div>
                <div className="flex-grow-1 border-top border-secondary-subtle"></div>
              </div>

              <div className="d-flex justify-content-center gap-5 mb-2">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiJPnmAo10Myt18wHbOBNdhnWTl7-YbOhPZw&s"
                  alt="Google"
                  width={35}
                  height={35}
                  style={{ cursor: "pointer" }}
                />
                <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/053/408/038/small/facebook-icon-with-round-line-and-transparent-background-free-png.png"
                  alt="Facebook"
                  width={35}
                  height={35}
                  style={{ cursor: "pointer" }}
                />
                <img
                  src="https://static.vecteezy.com/system/resources/previews/018/930/482/non_2x/linkedin-logo-linkedin-icon-transparent-free-png.png"
                  alt="LinkedIn"
                  width={35}
                  height={35}
                  style={{ cursor: "pointer" }}
                />
                <img
                  src="https://www.freeiconspng.com/uploads/black-lines-twitter-icon-symbol-18.png"
                  alt="Twitter"
                  width={35}
                  height={35}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Right-side image */}
        <Col
          md={6}
          className="d-none d-md-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <img
            src="sign-in.png"
            alt="Background"
            style={{ maxHeight: '60%', width: '100%', objectFit: 'contain', marginBottom:'15%' }}
          />
        </Col>
      </Row>
    </Container>
  );
}
