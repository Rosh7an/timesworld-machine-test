import Carousel from "react-bootstrap/Carousel";
import { ReactComponent as India } from "../assets/india.svg";

export default function Slider() {
  return (
    <Carousel
      fade
      activeIndex={0}
      indicators={true}
      className="custom-carousel"
      // style={{
      //   "& .carousel-indicators": {
      //     width: "10px",
      //     height: "10px",
      //     borderRadius: "50%",
      //     backgroundColor: "#ccc",
      //     margin: "0 5px",
      //   },
      //   "& .carousel-indicators .active": {
      //     backgroundColor: "#333",
      //   },
      // }}
    >
      <Carousel.Item>
        <India style={{ width: "100%" }} />
      </Carousel.Item>
      <Carousel.Item>
        <India style={{ width: "100%" }} />
      </Carousel.Item>
      <Carousel.Item>
        <India style={{ width: "100%" }} />
      </Carousel.Item>
    </Carousel>
  );
}
