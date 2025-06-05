import { ButtonProps } from "react-bootstrap";

export default function StyledButton({ onClick }: ButtonProps) {
  return (
    <div style={{ textAlign: "center", margin: "20px 0" }}>
      <button
        onClick={(e) => onClick && onClick(e)}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          fontWeight: "bold",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#363431",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Load More
      </button>
    </div>
  );
}
