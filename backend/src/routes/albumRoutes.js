const express = require('express');
const router = express.Router();
const { uploadAlbum, getAlbums, getAlbumById, updateAlbum, deleteAlbum } = require('../controllers/albumController');
const { upload } = require('../utils/fileUpload');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, upload.array('images', 10), uploadAlbum);
router.get('/', authMiddleware, getAlbums);
router.get('/:id', authMiddleware, getAlbumById);
router.put('/:id', authMiddleware, updateAlbum);
router.delete('/:id', authMiddleware, deleteAlbum);

module.exports = router;