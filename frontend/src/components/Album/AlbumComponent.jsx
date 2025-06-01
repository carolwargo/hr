//hr/src/components/Album/AlbumComponent.jsx 
import { useState, useEffect } from 'react';
import api from '../../api/index.jsx'; // Adjust the import path as necessary
import { Modal, Button, Form, Carousel } from 'react-bootstrap';
import { saveAs } from 'file-saver';
import '../../App.css';

const AlbumComponent = () => {
  const [albums, setAlbums] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [currentAlbum, setCurrentAlbum] = useState(null);
  const [newAlbum, setNewAlbum] = useState({ title: '', description: '', images: [] });
  const [previewImages, setPreviewImages] = useState([]);
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await api.get('/api/albums');
      setAlbums(response.data);
    } catch (error) {
      console.error('Error fetching albums:', error);
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
    const shareUrl = `${window.location.origin}/album/${albumId}`;
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

  return (
    <div className="bg-secondary-subtle">
      <div className="container py-5">
        <h3 className="fw-light">
          <i className="fas fa-camera mb-3"></i>
          <b className="fw-bold">image</b>vault.
        </h3>
        <Button variant="primary" onClick={() => setShowUploadModal(true)} className="mb-3">
          Upload New Album
        </Button>
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

        {/* Upload Modal */}
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

        {/* Edit Modal */}
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
                    onChange={(e) =>
                      setCurrentAlbum({ ...currentAlbum, title: e.target.value })
                    }
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

        {/* Preview Modal */}
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
    </div>
  );
};

export default AlbumComponent;