//hr/frontend/src/components/Album/SingleAlbum.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';

const SingleAlbum = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const response = await api.get(`/api/albums/${id}`);
        setAlbum(response.data);
      } catch (error) {
        console.error('Error fetching album:', error);
      }
    };
    fetchAlbum();
  }, [id]);

  if (!album) return <div>Loading...</div>;

  return (
    <div className="container py-5">
      <h3>{album.title}</h3>
      <p>{album.description}</p>
      <div className="row">
        {album.images.map((image, index) => (
          <div className="col-md-4" key={index}>
            <img src={image} alt={`Image ${index + 1}`} className="img-fluid" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleAlbum;