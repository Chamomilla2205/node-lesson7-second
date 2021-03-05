const jwt = require('jsonwebtoken');

module.exports = () => {
    const access_token = jwt.sign({}, 'JWT_SECRET', {expiresIn: '20sec'});
    const refresh_token = jwt.sign({}, 'JWT_REFRESH_SECRET', {expiresIn: '40sec'});

    return {
        access_token,
        refresh_token
    }
}

