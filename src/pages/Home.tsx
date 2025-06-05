import { useEffect, useState } from "react";
import { Col, Row, Spinner, Tab, Tabs } from "react-bootstrap";
import { Navigate, useLocation } from "react-router-dom";
import CountryList from "../components/CountryList";
import Slider from "../components/Slider";

export default function Home() {
  const location = useLocation();
  if (location.state?.fromLogin !== true) {
    return <Navigate to="/" replace />;
  }

  return <WelcomePage />;
}
function WelcomePage() {
  const [countries, setCountries] = useState([]);
  const [region, setRegion] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [key, setKey] = useState("All");

  useEffect(() => {
    setLoading(true);
    fetch(`https://restcountries.com/v2/all?fields=name,region,flag`)
      .then((response: any) => response.json())
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleRegionChange = (region: string | null) => {
    if (region !== null) {
      setRegion(region);
      setKey(region);
    }
  };

  return (
    <div style={{ marginTop: "2%" }}>
      <Row className="mx-5">
        <Col md={10}>
          <h2>Countries</h2>
        </Col>
        <Col md={2}>
          <Tabs activeKey={key} onSelect={(k) => handleRegionChange(k)}>
            <Tab eventKey="All" title="All" />
            {/* <Tab eventKey="Africa" title="Africa" /> */}
            {/* <Tab eventKey="Americas" title="Americas" /> */}
            <Tab eventKey="Asia" title="Asia" />
            <Tab eventKey="Europe" title="Europe" />
            {/* <Tab eventKey="Oceania" title="Oceania" /> */}
          </Tabs>
        </Col>
      </Row>

      <Row className="my-5">
        <div className="d-flex justify-content-center">
          <div className="w-100 border-top border-dark my-2 mx-5"></div>
          <h1 className="my-0">WELCOME</h1>
          <div className="w-100 border-bottom border-dark my-2 mx-5"></div>
        </div>
      </Row>

      <Row className="my-5">
        <Col md={9}>
          <Slider />
        </Col>
        <Col md={2}>
          <Slider />
        </Col>
      </Row>
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <>
          <Row>
            <CountryList countries={countries} region={region} />
          </Row>
          {/* <Row>
            <Col md={12}>
              <button onClick={() => handlePageChange(page + 1)}>
                Load More
              </button>
            </Col>
          </Row> */}
        </>
      )}
    </div>
  );
}
