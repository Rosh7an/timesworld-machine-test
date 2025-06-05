import { Spinner } from "react-bootstrap"

export default function CenterSpinner(){
    return    (<div
    style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Spinner animation="border" />
  </div>)
}