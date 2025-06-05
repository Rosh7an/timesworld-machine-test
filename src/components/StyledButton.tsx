import { ButtonProps } from "react-bootstrap";

export default function StyledButton({ onClick, title, style }: ButtonProps) {
  return (
    <div style={style}>
      <button
        onClick={(e) => onClick && onClick(e)}
        style={{
          width: style?.width,
          padding: "10px 20px",
          fontSize: "16px",
          fontWeight: "bold",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#3D3D3D",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        {title}
      </button>
    </div>
  );
}
