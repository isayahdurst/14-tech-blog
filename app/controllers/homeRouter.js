const { Router } = require('express');
const optionalAuth = require('../middleware/optionalAuth');
const auth = require('../middleware/auth');
const { User, Post, Comment } = require('../models');

const homeRouter = new Router();

homeRouter.get('/', optionalAuth, async (req, res) => {
    const user = req.user;

    const posts = await Post.findAll({
        include: [
            {
                model: User,
            },
        ],
        order: [['createdAt', 'DESC']],
    });

    const plainPosts = posts.map((post) => post.get({ plain: true }));

    res.render('home', {
        user: user,
        posts: plainPosts,
    });
});

homeRouter.get('/dashboard', auth, async (req, res) => {
    const user = req.user;

    const posts = await Post.findAll({
        where: {
            user_id: user.id,
        },
        order: [['createdAt', 'DESC']],
    });

    const plainPosts = posts.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
        user: user,
        posts: plainPosts,
    });
});

homeRouter.get('/post/:id', optionalAuth, async (req, res) => {
    const { id } = req.params;
    const user = req.user;

    const post = await Post.findByPk(id, {
        include: [
            {
                model: User,
            },
            {
                model: Comment,
                order: [['createdAt', 'DESC']],
                include: [
                    {
                        model: User,
                    },
                ],
            },
        ],
    });

    if (!post) {
        res.redirect('/');
    }

    const plainPost = post.get({ plain: true });
    const contentArr = plainPost.content.split('\n').filter((el) => el);
    plainPost.contentArr = contentArr;

    if (user) {
        if (user.id === post.user_id) {
            plainPost.is_author = true;
        } else {
            plainPost.is_author = false;
        }
    }

    res.render('single-post', {
        post: plainPost,
        user: user,
    });
});

module.exports = homeRouter;
