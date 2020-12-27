const { Router } = require('express');

const router = Router();
const userController = require('../controllers/UsersController');

const checkAuth = require('../middleware/check-auth');

router.post('/', userController.create);

router.use(checkAuth);
router.get('/', userController.indexAll);
router.get('/:userId', userController.indexOne);
router.put('/:userId', userController.update);
router.delete('/:userId', userController.delete);

module.exports = router;
