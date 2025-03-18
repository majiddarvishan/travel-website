import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, InputGroup, Spinner } from 'react-bootstrap';
import PlaceCard from '../components/PlaceCard';
import { API_URL } from '../config';

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await fetch(`${API_URL}/places`);
        if (!response.ok) {
          throw new Error('Failed to fetch places');
        }
        const data = await response.json();
        setPlaces(data);
        setFilteredPlaces(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  useEffect(() => {
    const results = places.filter(place =>
      place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPlaces(results);
  }, [searchTerm, places]);

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1 className="display-5">Explore Beautiful Places</h1>
        <p className="lead text-muted">Discover amazing destinations around the world</p>
      </div>

      <Row className="mb-4">
        <Col lg={6} className="mx-auto">
          <InputGroup className="mb-3">
            <InputGroup.Text>
              <i className="bi bi-search"></i>
            </InputGroup.Text>
            <Form.Control
              placeholder="Search for destinations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>

      {isLoading ? (
        <div className="text-center py-5">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : filteredPlaces.length === 0 ? (
        <div className="text-center py-5">
          <h4>No destinations found</h4>
          <p>Try adjusting your search criteria</p>
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredPlaces.map(place => (
            <Col key={place.id}>
              <PlaceCard place={place} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default PlacesPage;
