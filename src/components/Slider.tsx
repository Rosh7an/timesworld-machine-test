import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { ReactComponent as India } from "../assets/india.svg";
import "./SliderStyles.css";
import store from "../store";

const Slider = () => {
  const [randomImages, setRandomImages] = useState<any[]>([]);

  useEffect(() => {
    const state = store.getState();
    const countries = state?.countries || [];

    const shuffled = [...countries].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 4);
    setRandomImages(selected);
  }, []);

  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? randomImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === randomImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <Row className="mb-4 justify-content-around align-items-center">
      <Col md={10} xs={12} className="border border-dark border-3">
        <div className="custom-carousel-wrapper">
          <Carousel
            fade
            activeIndex={index}
            onSelect={setIndex}
            indicators={false}
            controls={false}
            slide={false}
          >
            {randomImages.map((item, idx) => (
              <Carousel.Item key={idx}>
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ position: "relative" }}
                >
                  <img
                    src={item?.flag}
                    alt={`Slide ${idx}`}
                    style={{
                      width: "100%",
                      height: "400px",
                      objectFit: "cover",
                    }}
                    className="py-2"
                  />
                  <div className="custom-carousel-controls">
                    <button className="arrow-btn" onClick={handlePrev}>
                      ←
                    </button>
                    <div className="dots">
                      {randomImages.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          className={`dot ${dotIdx === index ? "active" : ""}`}
                          onClick={() => setIndex(dotIdx)}
                        />
                      ))}
                    </div>
                    <button className="arrow-btn" onClick={handleNext}>
                      →
                    </button>
                  </div>
                </div>
                <Carousel.Caption className="text-black p-3 rounded text-outline">
                  <h3>{item.name}</h3> <p>{item.region}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </Col>

      <Col md={1} xs={12} className="mx-0 mt-md-0 border border-dark border-3">
        <img src="https://ftnnews.com/wp-content/uploads/2025/03/Happiest-Countries-in-2025-scaled.webp" style={{ width: "100%", height: "400px" }} />
      </Col>
    </Row>
  );
};

export default Slider;
