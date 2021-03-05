const authService = require('../service/auth.service');
const { Users,O_Auth } = require('../dataBase/models')
const { passHash, tokenizer } = require('../helpers')


module.exports = {
    enterToAccount: async (req, res) => {
        try {
            await authService.login(req.body)

            res.json('AuthController')
        } catch (err) {
            res.json(err.message)
        }
    },

    getNewTokens: async (req,res) => {
        try {
            const {tokens} = req;
            console.log(tokens)
        } catch (err) {

        }
    }
};
