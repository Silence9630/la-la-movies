const mongoose = require('mongoose');

const userMovieSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  category: { type: String, enum: ['favorite', 'watchlist'], required: true },
  notes: { type: String, default: '' }
}, { timestamps: true }); // createdAt = addedAt

// Ensure one user cannot add same movie twice in same category
userMovieSchema.index({ user: 1, movie: 1, category: 1 }, { unique: true });

module.exports = mongoose.model('UserMovie', userMovieSchema);