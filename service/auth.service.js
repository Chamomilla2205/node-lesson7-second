const { Users, O_Auth } = require('../dataBase/models');
const { passHash, tokenizer } = require('../helpers');

module.exports = {
    login: async ({ email, password }) => {

        const user = await Users.findOne({email})

        if (!user) {
            throw new Error('FALSE EMAIL OR PASS')
        }

        await passHash.compare(password, user.password);

        const tokens = tokenizer();
        console.log(tokens)
        await O_Auth.create({ ...tokens, _user_id: user._id})
    }
};
