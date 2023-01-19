const { Router } = require('express');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const { findOne } = require('../../models/User');

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
        console.log(user);
        res.json('User already exists');
        return;
    }

    try {
        const user = await User.create({
            first_name,
            last_name,
            username,
            email,
            password,
        });

        if (!user) {
            throw new Error('Unable to create user. Try again.');
        }

        console.log('created user');

        const token = jwt.sign({ id: username }, process.env.JWT_KEY);
        console.log('signed token');
        res.cookie('loginToken', token, { httpOnly: true });
        res.json({ message: 'logged in' });
    } catch (error) {
        console.log(error.message);
        res.json({ message: error.message });
    }
});

userRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({
        where: {
            username: username,
        },
    });

    if (!user) {
        res.status(400).json({ message: 'User not found' });
        return;
    }

    const correctPassword = await user.checkPassword(password);

    if (!correctPassword) {
        res.status(401).json({ message: 'Incorred password' });
        return;
    }

    const token = jwt.sign({ id: username }, process.env.JWT_KEY);
    res.cookie('loginToken', token, { httpOnly: true });
    res.json({ message: 'Logged in successfully' });
});

userRouter.get('/logout', async (req, res) => {
    console.log(process.env.DOMAIN);
    const { loginToken } = req.cookies;
    console.log(loginToken);
    res.clearCookie('loginToken', {
        path: '/',
        domain: process.env.DOMAIN || 'localhost',
        expires: new Date(1),
    });
    res.end();
});
module.exports = userRouter;
