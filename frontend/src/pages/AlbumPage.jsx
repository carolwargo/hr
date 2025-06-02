import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, Modal, Button, Form, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../api/api'; // Adjust path if needed
import White from '../assets/images/LandScape/White.png';

function Profile() {
  const [albums, setAlbums] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', images: [] });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      fetchAlbums();
    } else {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  const fetchAlbums = async () => {
    try {
      const response = await api.get('/api/albums');
      setAlbums(response.data);
    } catch (error) {
      console.error('Error fetching albums:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
      }
      setError('Failed to load albums.');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUploadClick = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/auth');
      return;
    }
    setShowUploadModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.title || !formData.description || formData.images.length === 0) {
      setError('Please fill out all fields and select at least one image.');
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    formData.images.forEach((image) => data.append('images', image));

    try {
      await api.post('/api/albums', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setFormData({ title: '', description: '', images: [] });
      setShowUploadModal(false);
      fetchAlbums(); // Refresh albums
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to upload album.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="graphics" id="graphics">
      <style>
        {`
          .bd-placeholder-img {
            font-size: 1.125rem;
            text-anchor: middle;
            -webkit-user-select: none;
            -moz-user-select: none;
            user-select: none;
          }

          @media (min-width: 768px) {
            .bd-placeholder-img-lg {
              font-size: 3.5rem;
            }
          }

          body {
            padding-top: 70px;
          }

          .floating-plus {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 60px;
            height: 60px;
            background-color: #007bff;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            cursor: pointer;
            z-index: 1000;
            transition: background-color 0.3s;
          }

          .floating-plus:hover {
            background-color: #0056b3;
          }

          .footer {
            position: relative;
            margin-top: 2rem;
          }
        `}
      </style>

      {/* Fixed Navbar */}
      <Navbar collapseOnSelect expand="lg" className="bg-info-subtle" fixed="top">
        <Container fluid>
          <Navbar.Brand href="#home" className="fw-light" onClick={scrollToTop}>
            <i className="fas fa-camera"></i>
            <b>my</b>album.
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
              <Nav.Link href="#upload" onClick={handleUploadClick}>
                <i className="fas fa-cloud-upload-alt text-info"></i> Upload
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link eventKey={2} href="#/auth">
                <i className="fas fa-lock"></i> Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <div>
        <section
          className="py-5 text-center"
          style={{
            position: 'relative',
            backgroundImage: `url(${White})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.75)',
              zIndex: -1,
            }}
          ></div>
          <div className="container-fluid">
            <div className="row justify-content-center align-items-center py-lg-5">
              <div className="col-lg-6 col-md-8 mx-auto">
                <h1 className="fw-light">
                  <i className="fas fa-camera" style={{ marginRight: '4px', fontSize: '1.75rem' }}></i>
                  <b>my</b>album.
                </h1>
                <p className="lead text-muted">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi maxime dolorem
                  obcaecati voluptatem? Voluptates, nam? Eligendi voluptas repellat ipsa, alias
                  assumenda laboriosam in quibusdam, harum quasi inventore iure vero ipsum?
                </p>
                <p>
                  <a href="/" className="btn btn-info my-2 w3-margin-right">
                    Contact
                  </a>
                  <button className="btn btn-secondary my-2" onClick={handleUploadClick}>
                    Upload
                  </button>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Album Grid */}
      <div className="bg-secondary-subtle">
        <div className="container py-5">
          <h3 className="fw-light text-center">
            <i className="fas fa-camera mb-3"></i>
            <b className="fw-bold">image</b>vault.
          </h3>
          {error && <div className="text-danger text-center mb-3">{error}</div>}
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {albums.map((album) => (
              <div className="col p-4" key={album._id}>
                <div className="card shadow-sm border border-dark-subtle">
                  <img
                    src={album.images[0] || '/placeholder.jpg'}
                    className="card-img-top w3-opacity w3-hover-opacity-off border border-bottom"
                    alt={album.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body p-4">
                    <h5 className="card-title">{album.title}</h5>
                    <p className="card-text">{album.description}</p>
                  </div>
                  <div className="card-footer d-flex justify-content-between align-items-center py-3">
                    <div className="btn-group">
                      <button type="button" className="btn btn-sm btn-outline-secondary">
                        <i className="fas fa-eye"></i> View
                      </button>
                      <button type="button" className="btn btn-sm btn-outline-secondary">
                        <i className="fas fa-edit"></i> Edit
                      </button>
                      <button type="button" className="btn btn-sm btn-secondary">
                        <i className="fas fa-share"></i> Share
                      </button>
                    </div>
                    <small className="text-muted w3-opacity w3-hover-opacity-off">
                      <i className="fas fa-trash" style={{ fontSize: '1rem' }}></i>
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Plus Button */}
      <div className="floating-plus" onClick={handleUploadClick}>
        +
      </div>

      {/* Upload Modal */}
      <Modal show={showUploadModal} onHide={() => setShowUploadModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create New Album</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpload}>
            <Form.Group className="mb-3" controlId="albumTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter album title"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="albumDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter album description"
                rows={3}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="albumImages">
              <Form.Label>Images</Form.Label>
              <Form.Control
                type="file"
                multiple
                accept="image/jpeg,image/png"
                onChange={handleFileChange}
                required
              />
            </Form.Group>
            {error && <div className="text-danger mb-3">{error}</div>}
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" /> Uploading...
                </>
              ) : (
                'Upload Album'
              )}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Connect Section */}
      <div className="bg-secondary-subtle py-5">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center g-5">
            <div className="col-sm-12 col-md-5 col-lg-5">
              <div className="container px-lg-5">
                <h4>Connect with Us</h4>
                <br />
                <p style={{ fontSize: '14px' }}>
                  If you need inspiration from our community,{' '}
                  <a style={{ fontSize: '14px' }} href="/" className="link-info">
                    Follow us on Twitter X
                  </a>
                  , or{' '}
                  <a href="/" className="link-info" style={{ fontSize: '14px' }}>
                    Like us on Facebook
                  </a>
                  . For non-urgent inquiries, feel free to reach out to us via{' '}
                  <a href="mailto:carolwargo.dev@gmail.com" className="link-info">
                    Email
                  </a>
                  . Have a concern that just can't wait, contact{' '}
                  <a href="mailto:carolwargo.dev@gmail.com" className="link-info">
                    Customer Support
                  </a>
                  .
                </p>
              </div>
            </div>
            <div className="col-sm-12 col-md-2 col-lg-2"></div>
            <div className="col-sm-12 col-md-5 col-lg-5">
              <div className="container px-lg-5">
                <h5>CUSTOMER SERVICE</h5>
                <div className="row">
                  <div className="col-sm-6 col-md-6 col-lg-6">
                    <ul className="list-unstyled">
                      <li>
                        <a href="/" className="link-info" style={{ fontSize: '16px' }}>
                          <i className="fab fa-twitter w3-margin-right"></i>
                          Twitter
                        </a>
                      </li>
                      <li>
                        <a href="/" className="link-info" style={{ fontSize: '16px' }}>
                          <i className="fab fa-facebook w3-margin-right"></i>
                          Facebook
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-6">
                    <ul className="list-unstyled">
                      <li>
                        <a href="mailto:carolwargo.dev@gmail.com" className="link-info" style={{ fontSize: '16px' }}>
                          <i className="fas fa-envelope w3-margin-right"></i>
                          Email Us
                        </a>
                      </li>
                      <li>
                        <a href="mailto:carolwargo.dev@gmail.com" className="link-info" style={{ fontSize: '16px' }}>
                          <i className="fas fa-phone w3-margin-right"></i>
                          Support
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center pb-3">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
          >
            <i className="fa fa-arrow-left w3-hover-opacity"></i> Return
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-muted py-5 footer">
        <div className="container">
          <p className="float-end mb-1">
            <a href="#home" style={{ color: '#FF385C' }} onClick={scrollToTop}>
              Back to top
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Profile;