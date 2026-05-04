const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  releaseYear: { type: Number, required: true, min: 1900 },
  duration: { type: Number, required: true }, // minutes
  language: { type: String, default: 'Kinyarwanda' },
  country: { type: String, default: 'Rwanda' },
  genres: [{ type: String, required: true }],
  posterUrl: { type: String, required: true },
  trailerUrl: { type: String, default: '' },
  videoUrl: { type: String, required: true },
  viewCount: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

// Text index for search
movieSchema.index({ title: 'text', description: 'text' });
// Compound index for filtering
movieSchema.index({ releaseYear: 1, genres: 1 });

module.exports = mongoose.model('Movie', movieSchema);