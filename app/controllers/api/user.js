const { Router } = require('express');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const userRouter = new Router();

userRouter.get('/', (req, res) => {
    res.json({ message: 'received' });
});

userRouter.post('/register', async (req, res) => {
    const { first_name, last_name, username, email, password } = req.body;

    const user = await User.findOne({
        where: {
            [Op.or]: [
                {
                    username: username,
                },
                {
                    email: email,
                },
            ],
        },
    });

    if (user) {
        throw new Error('User already exists.');
    }

    try {
        const user = User.create({
            first_name,
            last_name,
            username,
            email,
            password,
        });

        if (!user) {
            throw new Error('Unable to create user. Try again.');
        }

        const token = jwt.sign({ id: username }, process.env.JWT_KEY);
        res.cookie('loginToken', token, { httpOnly: true });
        res.json({
            id: user.id,
        });
    } catch (error) {
        console.log(error.message);
        res.json({ message: error.message });
    }
});
module.exports = userRouter;
