const { Router } = require('express');

const router = Router();
const authController = require('../controllers/AuthController');

router.post('/login', authController.login);
router.post('/forgotpass', authController.forgotPassword);
router.post('/resetpass/:resetLink', authController.resetPass);

module.exports = router;
