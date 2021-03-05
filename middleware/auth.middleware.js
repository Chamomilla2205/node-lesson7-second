const jwt = require('jsonwebtoken');
const {errorCodes} = require('../constants')

const {O_Auth} = require('../dataBase/models');

module.exports = {
    checkAccessTokenMiddleware: async (req,res,next) => {
        try {
            const access_token = req.get('Authorization');

            if (!access_token) {
                throw new Error('Token is required')
            }

            jwt.verify(access_token, 'JWT_SECRET', (err) => {
                if (err) {
                    throw new Error('Not valid token')
                }
            })

            const tokens = await O_Auth.findOne({access_token}).populate('_user_id')

            if (!tokens) {
                throw new Error('Not valid token')
            }

            req.user = tokens._user_id;

            next()
        } catch (err) {

        }
    },

    checkRefreshTokenMiddleware: async (req,res,next) => {
        try {
            const refresh_token = req.get('Authorization');

            if (!refresh_token) {
                throw new Error('Token is required')
            }

            jwt.verify(refresh_token, 'JWT_REFRESH_SECRET', (err) => {
                if (err) {
                    throw new Error('Refresh token is required')
                }
            })

            const tokens = await O_Auth.findOne({refresh_token});

            if (refresh_token !== tokens.refresh_token) {
                throw new Error('Token is invalid')
            }

            req.tokens = tokens;

            next()
        } catch (err) {
            res.status(errorCodes.BAD_REQUEST).json(err.message)
        }
    }
}
