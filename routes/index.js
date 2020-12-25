const express = require('express');
const router = express();

const userRoutes = require('./usersRoutes');
const auth = require('./authRoutes');

router.use('/users', userRoutes);
router.use('/auth', auth);

module.exports = router;
