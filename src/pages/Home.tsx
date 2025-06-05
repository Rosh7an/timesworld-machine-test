import { useEffect, useState } from "react";
import { Col, Row, Spinner, Tab, Tabs } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import CountryList from "../components/CountryList";
import Slider from "../components/Slider";
import store from "../store.ts";
import CenterSpinner from "../components/StyledSpinner.tsx";

export default function Home() {
  const location = useLocation();
  // if (location.state?.fromLogin !== true) {
  //   return <Navigate to="/" replace />;
  // }
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
    fetch(`https://restcountries.com/v2/all?fields=name,region,flag`)
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
    <CenterSpinner />
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
  const [key, setKey] = useState("All");

  const handleRegionChange = (region: string | null) => {
    if (region !== null) {
      store.dispatch({ type: "SET_REGION", region: region });
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

            <Tab eventKey="Asia" title="Asia" />
            <Tab eventKey="Europe" title="Europe" />
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
        <CenterSpinner />
      ) : (
        <>
          <Row>
            <CountryList countries={countries} region={region} />
          </Row>
        </>
      )}
    </div>
  );
}
