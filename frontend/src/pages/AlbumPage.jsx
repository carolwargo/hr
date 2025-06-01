//hr/src/pages/AlbumPage.jsx/profile
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Colors from '../assets/images/LandScape/Colors.png';
import Purple from '../assets/images/LandScape/Purple.png';
import Lake from '../assets/images/LandScape/Lake.png';
import SunRay from '../assets/images/LandScape/SunRay.png';
import Waterfall from '../assets/images/LandScape/Waterfall.png';
import YellowFlowers from '../assets/images/LandScape/YellowFlowers.png';
import White from '../assets/images/LandScape/White.png';

function Profile() {
  const imageArray = [
    Colors,
    Purple,
    Lake,
    Waterfall,
    SunRay,
    YellowFlowers,
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const [showUploadModal, setShowUploadModal] = useState(false);
  const handleUploadClick = () => {
    // Placeholder for upload action; replace with your upload modal logic
    alert('Upload action triggered! Implement modal here.');
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

          /* Ensure content is not hidden under fixed navbar */
          body {
            padding-top: 50px; /* Adjust based on navbar height */
          }

          /* Floating plus button styles */
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

          /* Adjust footer to avoid overlap */
          .footer {
            position: relative;
            margin-top: 2rem;
          }
        `}
      </style>

      {/* Fixed Navbar with Scroll to Top on Brand Click */}
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-info-subtle"
        fixed="top" // Make navbar fixed
      >
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
              <Nav.Link eventKey={2} href="#memes">
                <i className="fas fa-lock"></i> Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Background Image and White Mask */}
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
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {imageArray.map((image, index) => (
              <div className="col p-4" key={index}>
                <div className="card shadow-sm border border-dark-subtle">
                  <img
                    src={image}
                    className="card-img-top w3-opacity w3-hover-opacity-off border border-bottom"
                    alt={`Image ${index + 1}`}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body p-4">
                    <div className="card-text">
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum velit ullam
                        dolorum fugiat fuga, molestias reprehenderit recusandae tenetur beatae
                        voluptatibus nisi?
                      </p>
                    </div>
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
                    Follow us on Twitter X{' '}
                  </a>
                  , or{' '}
                  <a href="/" className="link-info" style={{ fontSize: '14px' }}>
                    Like us on Facebook{' '}
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
                <div className="d-flex justify-content-start align-items-center g-3">
                 
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
    </div>
  );
}

export default Profile;