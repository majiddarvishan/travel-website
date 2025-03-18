import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PlaceCard = ({ place }) => {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={place.imageUrl || 'https://via.placeholder.com/300x200?text=Beautiful+Destination'}
        className="card-img-custom"
      />
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <Card.Title>{place.name}</Card.Title>
          <Badge bg="info">{place.views} views</Badge>
        </div>
        <Card.Text className="text-muted mb-2">
          <i className="bi bi-geo-alt-fill me-1"></i> {place.location}
        </Card.Text>
        <Card.Text>{place.description.slice(0, 100)}...</Card.Text>
      </Card.Body>
      <Card.Footer className="bg-white border-top-0">
        <Link to={`/places/${place.id}`} className="btn btn-primary w-100">
          View Details
        </Link>
      </Card.Footer>
    </Card>
  );
};

export default PlaceCard;