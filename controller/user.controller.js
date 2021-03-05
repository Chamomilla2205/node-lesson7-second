const service = require('../service/user.service');
const errorCodes = require('../constants/error.codes');
const errorMessage = require('../error/error.messages');
const { passHash } = require('../helpers')
module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await service.findAllUsers();

            res.json(users);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    getSingleUser: async (req, res) => {
        try {
            const { userId } = req.params;

            const user = await service.findUserById(userId);

            res.json(user);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    addNewUser: async (req, res) => {
        try {
            const { preferLanguage = 'en' } = req.query;
            const { password } = req.body;

            const hashPassword = await passHash.hash(password);

            await service.createUser({...req.body, password: hashPassword})

            res.status(errorCodes.CREATED).json(errorMessage.USER_CREATED[preferLanguage]);
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const { preferLanguage = 'en' } = req.query;

            if (userId !== req.user.id) {
                throw new Error('Unauthorized')
            }

            await service.deleteUserById(userId);

            res.json(errorMessage.USER_DELETED[preferLanguage]);
        } catch (err) {
            res.status(errorCodes.BAD_REQUEST).json(err.message);
        }
    }
};
