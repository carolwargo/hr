//hr/frontend/src/components/Album/SingleAlbum.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/api';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

const SingleAlbum = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const response = await api.get(`/api/albums/${id}`);
        setAlbum(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching album:', error);
        setError('Failed to load album');
        setLoading(false);
      }
    };
    fetchAlbum();
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center py-5">
        <h3>{error}</h3>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h3>{album.title}</h3>
      <p>{album.description}</p>
      <Row>
        {album.images.map((image, index) => (
          <Col md={4} key={index} className="mb-3">
            <img src={image} alt={`Image ${index + 1}`} className="img-fluid" />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SingleAlbum;