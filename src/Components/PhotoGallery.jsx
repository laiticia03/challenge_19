import React, { useState } from 'react';
import SearchBar from './SearchBar';
import photosData from '../data/photos';
import Modal from 'react-modal';


Modal.setAppElement('#root'); // This is important for accessibility

const PhotoGallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [photos, setPhotos] = useState(photosData);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term) {
      setPhotos(photosData.filter(photo => photo.title.toLowerCase().includes(term.toLowerCase())));
    } else {
      setPhotos(photosData);
    }
  };

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <div>
      <div className="search-container">
        <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      </div>
      <div className="photo-gallery">
        {photos.map(photo => (
          <div key={photo.id} className="photo-item" onClick={() => handlePhotoClick(photo)}>
            <img src={photo.url} alt={photo.title} />
            <p>{photo.title}</p>
          </div>
        ))}
      </div>
      <Modal
        isOpen={!!selectedPhoto}
        onRequestClose={closeModal}
        contentLabel="Selected Photo"
        className="Modal"
        overlayClassName="Overlay"
      >
        {selectedPhoto && (
          <div className="modal-content">
            <h2>{selectedPhoto.title}</h2>
            <img src={selectedPhoto.url} alt={selectedPhoto.title} />
            <button onClick={closeModal}>Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PhotoGallery;