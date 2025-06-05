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
    <Container style={{ paddingLeft: "5%" }}>
      <Row>
        {displayedCountries.map((country, index) => (
          <div key={index} className="col-md-6">
            <CountryCard {...country} />
          </div>
        ))}
      </Row>
      <Button variant="dark" onClick={() => handlePageChange(countriesPerPage + 10)}>Load More</Button>
    </Container>
  );
};

export default CountryList;

function CountryCard(country: Country) {
  return (
    <Card
      style={{
        height: "150px",
        width: "85%",
        display: "flex",
        justifyContent: "center",
        marginBottom: "2%",
        border: "1px solid black",
      }}
    >
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Col md={4} style={{ paddingLeft: "2%" }}>
          <img
            src={country.flag}
            alt={country.name}
            style={{
              width: "200px",
              height: "140px",
              borderRadius: "10px",
              objectFit: "cover",
            }}
          />
        </Col>
        <Col md={8}>
          <h2>{country.name}</h2>
          <p>{country.region}</p>
        </Col>
      </Row>
    </Card>
  );
}
