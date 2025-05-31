const Album = require('../models/Album');

const uploadAlbum = async (req, res) => {
  try {
    const { title, description } = req.body;
    const images = req.files.map((file) => `/uploads/${file.filename}`); // Local storage URLs
    const album = new Album({ title, description, images });
    await album.save();
    res.status(201).json(album);
  } catch (error) {
    console.error('Error uploading album:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAlbums = async (req, res) => {
  try {
    const albums = await Album.find();
    res.json(albums);
  } catch (error) {
    console.error('Error fetching albums:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateAlbum = async (req, res) => {
  try {
    const { title, description } = req.body;
    const album = await Album.findByIdAndUpdate(
      req.params.id,
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
    const album = await Album.findByIdAndDelete(req.params.id);
    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }
    res.json({ message: 'Album deleted' });
  } catch (error) {
  console.error('Error deleting album:', error);
  res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { uploadAlbum, getAlbums, updateAlbum, deleteAlbum };