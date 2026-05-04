const express = require('express');
const { getMovies, getMovieById, createMovie, updateMovie, deleteMovie } = require('../controllers/movieController');
const { protect } = require('../middleware/authMiddleware');
const { roleCheck } = require('../middleware/roleMiddleware');
const router = express.Router();

router.get('/', getMovies);
router.get('/:id', getMovieById);
router.post('/', protect, roleCheck('admin', 'super_admin'), createMovie);
router.put('/:id', protect, roleCheck('admin', 'super_admin'), updateMovie);
router.delete('/:id', protect, roleCheck('admin', 'super_admin'), deleteMovie);

module.exports = router;