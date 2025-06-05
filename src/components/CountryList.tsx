import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Row
} from "react-bootstrap";

interface Country {
  name: string;
  region: string;
  flag: string;
}

interface CountryListProps {
  countries: Country[];
  region: string;
}

const CountryList = ({ countries, region }: CountryListProps) => {
  const [countriesPerPage, setCountriesPerPage] = useState(10);
  const [displayedCountries, setDisplayedCountries] = useState<Country[]>([]);
const filteredCountries = useMemo(
  () => (region === "All" ? countries : countries.filter((country) => country?.region === region)),
  [countries, region]
);

 useMemo(
  () => setDisplayedCountries(filteredCountries.slice(0, countriesPerPage)),
  [filteredCountries, countriesPerPage]
);

useEffect(() => {
  setCountriesPerPage(10);
}, [region]);

  const handlePageChange = (pageNumber: number) => {
    setCountriesPerPage(pageNumber);
  };


  return (
    <Container>
      <Row>
        {displayedCountries.map((country, idx) => (
          <Col xs={12} sm={6} md={6} lg={6} key={idx}>
            <CountryCard {...country} />
          </Col>
        ))}
      </Row>
              <div className="text-center my-3">
                <Button variant="dark" onClick={() => handlePageChange(countriesPerPage + 10)}>
                  Load more
                </Button>
              </div>      
    </Container>
  );
};

export default CountryList;

function CountryCard({ name, region, flag }: Country) {
  return (
    <Card className="mb-3 shadow-sm border-dark w-100">
      <Row className="g-0 align-items-center">
        <Col xs={4}>
          <img
            src={flag}
            alt={name}
            className="img-fluid rounded-start"
            style={{ height: "80px", objectFit: "cover" }}
          />
        </Col>
        <Col xs={8}>
          <Card.Body className="py-2">
            <Card.Title className="mb-1">{name}</Card.Title>
            <Card.Text className="text-muted small">{region}</Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}