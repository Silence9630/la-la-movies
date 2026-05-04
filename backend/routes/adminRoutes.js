const express = require('express');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');
const { roleCheck } = require('../middleware/roleMiddleware');
const router = express.Router();

// All routes here require super_admin role
router.use(protect, roleCheck('super_admin'));

// Get all users
router.get('/users', async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// Update user role
router.put('/users/:id/role', async (req, res) => {
  const { role } = req.body;
  if (!['end_user', 'admin', 'super_admin'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }
  const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
  res.json(user);
});

module.exports = router;