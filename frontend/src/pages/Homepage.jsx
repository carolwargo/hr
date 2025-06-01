//hr/src/pages/Homepage.jsx 
import  { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import { Modal, Button, Form, Carousel, NavLink } from 'react-bootstrap';
import { saveAs } from 'file-saver';
import { useNavigate } from 'react-router-dom';
import api from '../api/index';
import White from '../assets/images/LandScape/White.png';
import '../App.css'; 

function AlbumPage() {
  const [albums, setAlbums] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [currentAlbum, setCurrentAlbum] = useState(null);
  const [newAlbum, setNewAlbum] = useState({ title: '', description: '', images: [] });
  const [previewImages, setPreviewImages] = useState([]);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      fetchAlbums();
    }
  }, [isAuthenticated]);

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
        navigate('/auth');
      }
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setNewAlbum({ ...newAlbum, images: files });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAlbum({ ...newAlbum, [name]: value });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    const formData = new FormData();
    formData.append('title', newAlbum.title);
    formData.append('description', newAlbum.description);
    newAlbum.images.forEach((image) => formData.append('images', image));
    try {
      await api.post('/api/albums', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setNewAlbum({ title: '', description: '', images: [] });
      setShowUploadModal(false);
      fetchAlbums();
    } catch (error) {
      console.error('Error uploading album:', error);
    }
  };

  const handleEdit = (album) => {
    setCurrentAlbum(album);
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/albums/${currentAlbum._id}`, {
        title: currentAlbum.title,
        description: currentAlbum.description,
      });
      setShowEditModal(false);
      fetchAlbums();
    } catch (error) {
      console.error('Error updating album:', error);
    }
  };

  const handleDelete = async (albumId) => {
    if (window.confirm('Are you sure you want to delete this album?')) {
      try {
        await api.delete(`/api/albums/${albumId}`);
        fetchAlbums();
      } catch (error) {
        console.error('Error deleting album:', error);
      }
    }
  };

  const handleShare = (albumId) => {
    const shareUrl = `${window.location.origin}/#/hr/album/${albumId}`;
    navigator.clipboard.writeText(shareUrl);
    alert('Shareable link copied to clipboard!');
  };

  const handleDownload = async (imageUrl, fileName) => {
    try {
      const response = await api.get(imageUrl, { responseType: 'blob' });
      saveAs(response.data, fileName);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  const handlePreview = (album) => {
    setPreviewImages(album.images);
    setCurrentAlbum(album);
    setCarouselIndex(0);
    setShowPreviewModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/auth');
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
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
        `}
      </style>

      <Navbar collapseOnSelect expand="lg" className="bg-info-subtle">
        <Container fluid className="px-4">
          <Navbar.Brand href="#hr" className="fw-light">
            <i className="fas fa-camera"></i>
            <b>my</b>album.
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features" className="mx-1">Features</Nav.Link>
              <Nav.Link href="#pricing" className="mx-1">Pricing</Nav.Link>
              {isAuthenticated && (
                <Nav.Link href="#upload" className="mx-1" onClick={() => setShowUploadModal(true)}>
                  <i className="fas fa-cloud-upload-alt text-info"></i> Upload
                </Nav.Link>
              )}
            </Nav>
            <Nav>
              {isAuthenticated ? (
                <Nav.Link onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i> Logout
                </Nav.Link>
              ) : (
                <NavLink href="#auth">
                  <i className="fas fa-lock"></i> Login
                </NavLink>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

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
            className="mt-3"
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
                  <i
                    className="fas fa-camera"
                    style={{ marginRight: '4px', fontSize: '1.75rem' }}
                  ></i>
                  <b>my</b>album.
                </h1>
                <p className="lead text-muted">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi maxime dolorem
                  obcaecati voluptatem? Voluptates, nam? Eligendi voluptas repellat ipsa, alias
                  assumenda laboriosam in quibusdam, harum quasi inventore iure vero ipsum?
                </p>
                <p>
                  <a href="/" className="btn btn-info m-1">
                    Contact
                  </a>
                  {isAuthenticated && (
                    <Button
                      variant="secondary"
                      className="m-1"
                      onClick={() => setShowUploadModal(true)}
                    >
                      Upload
                    </Button>
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="bg-secondary-subtle">
        <div className="container py-5">
          <h3 className="fw-light">
            <i className="fas fa-camera mb-3"></i>
            <b className="fw-bold">image</b>vault.
          </h3>
          {isAuthenticated ? (
            <div className="row d-flex row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 justify-content-around">
              {albums.map((album) => (
                <div className="col p-4" key={album._id}>
                  <div className="card shadow-sm border border-dark-subtle">
                    <div className="position-relative">
                      <img
                        src={album.images[0] || '/placeholder.jpg'}
                        className="card-img-top w3-opacity w3-hover-opacity-off border border-bottom"
                        alt={album.title}
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                      <i
                        className="fas fa-eye position-absolute top-0 end-0 m-2 text-white"
                        style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                        onClick={() => handlePreview(album)}
                      ></i>
                    </div>
                    <div className="card-body p-4">
                      <h5 className="card-title">{album.title}</h5>
                      <p className="card-text">{album.description}</p>
                    </div>
                    <div className="card-footer d-flex justify-content-between align-items-center py-3">
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => handlePreview(album)}
                        >
                          <i className="fas fa-eye"></i> View
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => handleEdit(album)}
                        >
                          <i className="fas fa-edit"></i> Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-secondary"
                          onClick={() => handleShare(album._id)}
                        >
                          <i className="fas fa-share"></i> Share
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => handleDownload(album.images[0], `${album.title}-image.jpg`)}
                        >
                          <i className="fas fa-download"></i> Download
                        </button>
                      </div>
                      <small
                        className="text-muted w3-opacity w3-hover-opacity-off"
                        onClick={() => handleDelete(album._id)}
                        style={{ cursor: 'pointer' }}
                      >
                        <i className="fas fa-trash" style={{ fontSize: '1rem' }}></i>
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p>Please <a href="#auth" onClick={() => navigate('/auth')}>login</a> to view and manage your albums.</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-info-subtle py-5">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center g-5">
            <div className="col-sm-12 col-md-6 col-lg-6">
              <h4 style={{ marginLeft: '10px' }}>Create An Album</h4>
              <ol style={{ fontSize: '16px' }}>
                <li style={{ fontSize: '16px' }}>Click the 'Upload' button to start the process.</li>
                <li style={{ fontSize: '16px' }}>
                  Once prompted, select the photos you want to include in the album.
                </li>
                <li style={{ fontSize: '16px' }}>
                  After that, add some information about the album. Feel free to provide a brief
                  description, including details about the creator or the contents of the album. Make
                  it informative but concise, ensuring that readers can grasp the essence of the
                  images.
                </li>
              </ol>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6">
              <Card className="border justify-content-center rounded-50 border border-subtle">
                <Card.Body className="text-center py-5 border">
                  <Card.Title>UPLOAD HERE</Card.Title>
                  <Button
                    variant="info"
                    onClick={() => isAuthenticated ? setShowUploadModal(true) : navigate('/auth')}
                    style={{ fontSize: '5rem' }}
                  >
                    <i className="fas fa-cloud-upload-alt"></i>
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-secondary-subtle py-5">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center g-5">
            <div className="col-sm-12 col-md-5 col-lg-5">
              <div className="container">
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
              <div className="container">
                <div className="row">
                  <h5>CUSTOMER SERVICE</h5>
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
            href="#hr"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
          >
            <i className="fa fa-arrow-left w3-hover-opacity"></i> Return
          </a>
        </div>
      </div>

      <footer className="text-muted py-5">
        <div className="container">
          <p className="float-end mb-1">
            <a href="#hr" style={{ color: '#FF385C' }} onClick={scrollToTop}>
              Back to top
            </a>
          </p>
        </div>
      </footer>

      <Modal show={showUploadModal} onHide={() => setShowUploadModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Upload New Album</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpload}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newAlbum.title}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={newAlbum.description}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Images</Form.Label>
              <Form.Control
                type="file"
                multiple
                accept="image/jpeg,image/png"
                onChange={handleFileChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Upload
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Album</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentAlbum && (
            <Form onSubmit={handleUpdate}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={currentAlbum.title}
                  onChange={(e) => setCurrentAlbum({ ...currentAlbum, title: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={currentAlbum.description}
                  onChange={(e) =>
                    setCurrentAlbum({ ...currentAlbum, description: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>

      <Modal show={showPreviewModal} onHide={() => setShowPreviewModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{currentAlbum?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel activeIndex={carouselIndex} onSelect={(index) => setCarouselIndex(index)}>
            {previewImages.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={image}
                  alt={`Slide ${index + 1}`}
                  style={{ maxHeight: '500px', objectFit: 'contain' }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <p className="mt-3">{currentAlbum?.description}</p>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AlbumPage;