const { Router } = require('express');
const optionalAuth = require('../middleware/optionalAuth');
const auth = require('../middleware/auth');
const Post = require('../models/Post');

const homeRouter = new Router();

homeRouter.get('/', optionalAuth, async (req, res) => {
    const user = req.user;

    const posts = await Post.findAll();

    const plainPosts = posts.map((post) => post.get({ plain: true }));

    console.log(plainPosts);

    res.render('home', {
        user: user,
        posts: plainPosts,
    });
});

homeRouter.get('/dashboard', auth, async (req, res) => {
    const user = req.user;

    res.render('dashboard', {
        user: user,
    });
});

module.exports = homeRouter;
