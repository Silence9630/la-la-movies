const UserMovie = require('../models/UserMovie');
const Movie = require('../models/Movie');

// @desc Add movie to favorite or watchlist
exports.addToList = async (req, res) => {
  try {
    const { movieId, category, notes } = req.body;
    if (!['favorite', 'watchlist'].includes(category)) {
      return res.status(400).json({ message: 'Invalid category' });
    }
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    const userMovie = await UserMovie.findOneAndUpdate(
      { user: req.user._id, movie: movieId, category },
      { notes, updatedAt: Date.now() },
      { upsert: true, new: true }
    );
    res.status(201).json(userMovie);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Already in this list' });
    }
    res.status(500).json({ message: err.message });
  }
};

// @desc Remove movie from list
exports.removeFromList = async (req, res) => {
  try {
    const { movieId, category } = req.body;
    await UserMovie.findOneAndDelete({ user: req.user._id, movie: movieId, category });
    res.json({ message: 'Removed from list' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Get user's favorites/watchlist
exports.getUserList = async (req, res) => {
  try {
    const { category } = req.query; // 'favorite' or 'watchlist'
    const list = await UserMovie.find({ user: req.user._id, category })
      .populate('movie')
      .sort({ updatedAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};