import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Image, Badge } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';
import { API_URL } from '../config';

const PlaceDetailPage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const response = await fetch(`${API_URL}/places/${id}`);
        if (!response.ok) {
          throw new Error('Place not found');
        }
        const data = await response.json();
        setPlace(data);

        // Increment view count
        fetch(`${API_URL}/places/${id}/view`, { method: 'POST' })
          .catch(err => console.error('Error incrementing view count:', err));

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlace();
  }, [id]);

  const handleReviewAdded = (newReview) => {
    setPlace({
      ...place,
      reviews: [...(place.reviews || []), newReview]
    });
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col lg={8}>
          <Image
            src={place.imageUrl || 'https://via.placeholder.com/800x500?text=Beautiful+Destination'}
            alt={place.name}
            fluid
            className="rounded shadow-sm"
          />
        </Col>
        <Col lg={4}>
          <div className="mb-4">
            <h1>{place.name}</h1>
            <div className="d-flex align-items-center mb-3">
              <i className="bi bi-geo-alt-fill text-danger me-2"></i>
              <span className="text-muted">{place.location}</span>
            </div>
            <div className="d-flex align-items-center">
              <i className="bi bi-eye-fill text-primary me-2"></i>
              <span>{place.views} views</span>
            </div>
          </div>
          <div className="mb-4">
            <h4 className="mb-3">About this place</h4>
            <p>{place.description}</p>
          </div>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col lg={8}>
          <ReviewList reviews={place.reviews || []} />
        </Col>
        <Col lg={4}>
        <ReviewForm placeId={place.id} onReviewAdded={handleReviewAdded} />
        </Col>
      </Row>
    </Container>
  );
};

export default PlaceDetailPage;
