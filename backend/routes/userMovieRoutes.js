const express = require('express');
const { addToList, removeFromList, getUserList } = require('../controllers/userMovieController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.use(protect); // All routes require authentication
router.post('/list', addToList);
router.delete('/list', removeFromList);
router.get('/list', getUserList);

module.exports = router;