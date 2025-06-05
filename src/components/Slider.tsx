import Carousel from "react-bootstrap/Carousel";
import { ReactComponent as India } from "../assets/india.svg";

export default function Slider() {
  return (
    <Carousel
      fade
      activeIndex={0}
      indicators={true}
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
