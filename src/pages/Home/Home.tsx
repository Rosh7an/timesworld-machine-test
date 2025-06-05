import { useEffect } from "react";
import { Col, Container, Row, Spinner, Tab, Tabs } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import CountryList from "../../components/CountryList.tsx";
import Slider from "../../components/Slider.tsx";
import StyledSpinner from "../../components/StyledSpinner.tsx";
import { API_URL } from "../../constants.ts";
import store from "../../store.ts";
import "./TabStyles.css";

export default function Home() {
  const location = useLocation();
  if (location.state?.fromLogin !== true) {
    return <Navigate to="/" replace />;
  }
  return <InitState />;
}
function InitState() {
  const state = store.getState();

  const countries = useSelector((state: any) => state.countries);
  const region = useSelector((state: any) => state.region);
  const loading = useSelector((state: any) => state.loading);
  const error = useSelector((state: any) => state.error);

  useEffect(() => {
    store.dispatch({ type: "SET_LOADING", loading: true });
    fetch(API_URL)
      .then((response: any) => response.json())
      .then((data) => {
        store.dispatch({ type: "SET_COUNTRIES", countries: data });
        store.dispatch({ type: "SET_LOADING", loading: false });
      })
      .catch((error) => {
        store.dispatch({ type: "SET_ERROR", error: error });
        store.dispatch({ type: "SET_LOADING", loading: false });
      });
  }, []);

  return !!state.loading ? (
    <StyledSpinner />
  ) : (
    <WelcomePage
      countries={countries}
      region={region}
      loading={loading}
      error={error}
    />
  );
}

interface WelcomePageProps {
  countries: any[];
  region: string;
  loading: boolean;
  error: any;
}

function WelcomePage({ countries, region, loading, error }: WelcomePageProps) {

  const handleRegionChange = (region: string | null) => {
    if (region !== null) {
      store.dispatch({ type: "SET_REGION", region: region });
    }
  };

  return (
    <Container className="px-4 mt-3">
      <Row className="d-flex justify-content-between align-items-center mb-3">
        <Col xs="auto">
          <h4>Countries</h4>
        </Col>
        <Col xs="auto">
          <Tabs
            activeKey={region}
            onSelect={(k) => handleRegionChange(k || "All")}
            className="custom-tabs"
          >
            {["All", "Asia", "Europe"].map((r) => (
              <Tab key={r} eventKey={r} title={r} />
            ))}
          </Tabs>
        </Col>
      </Row>

      <Row className="my-5">
        <div className="d-flex justify-content-center">
          <div className="w-100 border-top border-2 border-dark mx-3"></div>
          <h1 className="my-0">WELCOME</h1>
          <div className="w-100 border-bottom border-2 border-dark mx-3"></div>
        </div>
      </Row>

      <Slider />

      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" />
        </div>
      ) : (
        <CountryList countries={countries} region={region} />
      )}
    </Container>
  );
}
