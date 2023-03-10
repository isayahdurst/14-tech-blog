const jwt = require('jsonwebtoken');

const User = require('../models/User');

module.exports = async (req, res, next) => {
    const { loginToken } = req.cookies;

    try {
        const data = jwt.verify(loginToken, process.env.JWT_KEY);
        const { id } = data;

        const user = await User.findOne({
            where: {
                username: id,
            },
        });

        if (user) {
            req.user = user;
        }
    } catch (error) {
        console.log(error);
    }
    next();
};
