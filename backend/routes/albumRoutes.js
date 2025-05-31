const express = require('express');
const router = express.Router();
const { uploadAlbum, getAlbums, updateAlbum, deleteAlbum } = require('../controllers/albumController');
const { upload } = require('../utils/fileUpload');

// Routes
router.post('/', upload.array('images'), uploadAlbum); // Upload new album
router.get('/', getAlbums); // Get all albums
router.put('/:id', updateAlbum); // Update album
router.delete('/:id', deleteAlbum); // Delete album

module.exports = router;