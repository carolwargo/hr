const Album = require('../models/Album');

const uploadAlbum = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'At least one image is required' });
    }
    const images = req.files.map((file) => `/uploads/${file.filename}`);
    const album = new Album({ title, description, images, userId: req.user.userId });
    await album.save();
    res.status(201).json(album);
  } catch (error) {
    console.error('Error uploading album:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAlbums = async (req, res) => {
  try {
    const albums = await Album.find({ userId: req.user.userId });
    res.json(albums);
  } catch (error) {
    console.error('Error fetching albums:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAlbumById = async (req, res) => {
  try {
    const album = await Album.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }
    res.json(album);
  } catch (error) {
    console.error('Error fetching album:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateAlbum = async (req, res) => {
  try {
    const { title, description } = req.body;
    const album = await Album.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { title, description },
      { new: true, runValidators: true }
    );
    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }
    res.json(album);
  } catch (error) {
    console.error('Error updating album:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteAlbum = async (req, res) => {
  try {
    const album = await Album.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }
    res.json({ message: 'Album deleted' });
  } catch (error) {
    console.error('Error deleting album:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { uploadAlbum, getAlbums, getAlbumById, updateAlbum, deleteAlbum };