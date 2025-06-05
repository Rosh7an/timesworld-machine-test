import { Spinner } from "react-bootstrap";

export default function StyledSpinner() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Spinner animation="border" />
    </div>
  );
}
