const router = require('express').Router();
const authController = require('../controller/auth.controller')
const { authMiddleware } = require('../middleware')

router.post('/', authController.enterToAccount);

router.post('/refreshToken', authMiddleware.checkRefreshTokenMiddleware, authController.getNewTokens);

module.exports = router;
