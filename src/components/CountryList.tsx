// CountryList.tsx
import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
  Spinner,
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

// export default function CountryList({ countries, region }:CountryListProps) {
//   const filteredCountries = region === 'All' ? countries : countries.filter((country) => country?.region === region);

//   return (
//     <ListGroup>
//       {filteredCountries?.map((country) => (
//         <ListGroupItem key={country.name}>
//           <img src={country?.flag} alt={country?.name} style={{ width: 20, height: 20 }} />
//           {country.name}
//         </ListGroupItem>
//       ))}
//     </ListGroup>
//   );
// };

const CountryList = ({ countries, region }: CountryListProps) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(10);
  const [displayedCountries, setDisplayedCountries] = useState<Country[]>([]);
  const filteredCountries =
    region === "All"
      ? countries
      : countries.filter((country) => country?.region === region);

  useEffect(() => {
    const start = (pageNumber - 1) * countriesPerPage;
    const end = start + countriesPerPage;
    filteredCountries &&
      setDisplayedCountries(filteredCountries.slice(start, end));
  }, [pageNumber, countriesPerPage, filteredCountries]);

  const handlePageChange = (pageNumber: number) => {
    setPageNumber(pageNumber);
  };

  return (
    <Container style={{paddingLeft:"5%"}}>
      <Row>
        {displayedCountries.map((country, index) => (
          <div key={index} className="col-md-6">
            <CountryCard {...country} />
          </div>
        ))}
      </Row>
      {/* <div className="pagination">
        {[1, 2, 3, 4, 5].map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={pageNumber === currentPage ? 'active' : ''}
          >
            {pageNumber}
          </button>
        ))}
      </div> */}
    </Container>
  );
};

export default CountryList;

function CountryCard(country: Country) {
  return (
   <Card style={{height:"150px",width:"85%",display:"flex",justifyContent:"center",marginBottom:"2%",border:"1px solid black"}}>
     <Row style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
       <Col md={4} style={{paddingLeft:"2%"}}>
         <img 
           src={country.flag} 
           alt={country.name} 
           style={{
             width: "200px", 
             height: "140px", 
             borderRadius: "10px", 
             objectFit: "cover"
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
