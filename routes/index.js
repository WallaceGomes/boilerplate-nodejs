const express = require('express');
const router = express();

const userRoutes = require('./usersRoutes');
const auth = require('./authRoutes');

router.use('/api/users', userRoutes);
router.use('/api/auth', auth);

module.exports = router;
