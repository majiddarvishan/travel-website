import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Carousel, Card } from 'react-bootstrap';
import PlaceCard from '../components/PlaceCard';
import { API_URL } from '../config';

const HomePage = () => {
  const [popularPlaces, setPopularPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularPlaces = async () => {
      try {
        const response = await fetch(`${API_URL}/places/popular`);
        if (!response.ok) {
          throw new Error('Failed to fetch popular places');
        }
        const data = await response.json();
        setPopularPlaces(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopularPlaces();
  }, []);

  const heroImages = [
    {
      url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      title: 'Discover Amazing Places',
      description: 'Explore breathtaking destinations around the world'
    },
    {
      url: 'https://images.unsplash.com/photo-1602002418082-dd0e57e89f9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
      title: 'Natural Wonders',
      description: 'Experience the beauty of unspoiled landscapes'
    },
    {
      url: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      title: 'Cultural Adventures',
      description: 'Immerse yourself in diverse cultures and traditions'
    }
  ];

  return (
    <>
      <Carousel fade className="hero-carousel">
        {heroImages.map((image, idx) => (
          <Carousel.Item key={idx}>
            <div
              className="hero-image d-block w-100"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${image.url})`
              }}
            >
              <div className="hero-text text-center text-white p-5">
                <h1>{image.title}</h1>
                <p className="lead">{image.description}</p>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      <Container className="py-5">
        <div className="text-center mb-5">
          <h2 className="display-5">Most Popular Destinations</h2>
          <p className="lead text-muted">Explore the places travelers love most</p>
        </div>

        {isLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <Card className="text-center p-5 bg-light">
            <Card.Body>
              <h4>Oops! Something went wrong</h4>
              <p>{error}</p>
            </Card.Body>
          </Card>
        ) : (
          <Row xs={1} md={2} lg={3} className="g-4">
            {popularPlaces.map(place => (
              <Col key={place.id}>
                <PlaceCard place={place} />
              </Col>
            ))}
          </Row>
        )}

        <div className="text-center mt-5">
          <h3 className="mb-4">Why Travel With Us?</h3>
          <Row className="g-4">
            <Col md={4}>
              <div className="feature-box text-center p-4">
                <div className="feature-icon mb-3">
                  <i className="bi bi-compass display-4 text-primary"></i>
                </div>
                <h4>Discover</h4>
                <p>Find hidden gems and popular destinations curated by travelers like you.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="feature-box text-center p-4">
                <div className="feature-icon mb-3">
                  <i className="bi bi-chat-quote display-4 text-primary"></i>
                </div>
                <h4>Share</h4>
                <p>Share your experiences and recommendations with fellow travelers.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="feature-box text-center p-4">
                <div className="feature-icon mb-3">
                  <i className="bi bi-map display-4 text-primary"></i>
                </div>
                <h4>Plan</h4>
                <p>Use authentic reviews and tips to plan your perfect adventure.</p>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default HomePage;