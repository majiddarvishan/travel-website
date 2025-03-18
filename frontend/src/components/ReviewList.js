import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const ReviewList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <Card className="text-center py-5">
        <Card.Body>
          <h5>No reviews yet</h5>
          <p>Be the first to share your experience!</p>
        </Card.Body>
      </Card>
    );
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <h4 className="mb-4">Traveler Reviews ({reviews.length})</h4>
      {reviews.map(review => (
        <Card key={review.id} className="mb-3">
          <Card.Body>
            <Row>
              <Col>
                <div className="d-flex justify-content-between">
                  <h5>{review.userName}</h5>
                  <div>
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`bi ${i < review.rating ? 'bi-star-fill' : 'bi-star'} text-warning`}
                      ></i>
                    ))}
                  </div>
                </div>
                <small className="text-muted">{formatDate(review.createdAt)}</small>
                <p className="mt-3">{review.comment}</p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default ReviewList;