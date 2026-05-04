const Movie = require('../models/Movie');

// @desc Get all published movies (with pagination, search, filter)
exports.getMovies = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, genre, year } = req.query;
    let query = { isPublished: true };

    if (search) {
      query.$text = { $search: search };
    }
    if (genre) {
      query.genres = genre;
    }
    if (year) {
      query.releaseYear = parseInt(year);
    }

    const movies = await Movie.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('createdBy', 'name');

    const total = await Movie.countDocuments(query);
    res.json({ movies, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Get single movie by ID
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate('createdBy', 'name');
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    // Increment view count (fire-and-forget, could be async)
    movie.viewCount += 1;
    await movie.save();
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Create movie (admin or super_admin)
exports.createMovie = async (req, res) => {
  try {
    const { title, description, releaseYear, duration, language, country, genres, posterUrl, trailerUrl, videoUrl } = req.body;
    const movie = await Movie.create({
      title, description, releaseYear, duration, language, country, genres, posterUrl, trailerUrl, videoUrl,
      createdBy: req.user._id
    });
    res.status(201).json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Update movie (admin or super_admin)
exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    // Allow if user is super_admin OR the one who created it
    if (req.user.role !== 'super_admin' && movie.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to edit this movie' });
    }
    Object.assign(movie, req.body);
    await movie.save();
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Delete movie (admin or super_admin)
exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    if (req.user.role !== 'super_admin' && movie.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this movie' });
    }
    await movie.deleteOne();
    // Also delete all UserMovie entries for this movie
    await require('../models/UserMovie').deleteMany({ movie: movie._id });
    res.json({ message: 'Movie removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};