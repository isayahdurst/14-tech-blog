const { Router } = require('express');
const Post = require('../../models/Post');
const auth = require('../../middleware/auth');

const postRouter = new Router();

postRouter.post('/', auth, async (req, res) => {
    const { title, content } = req.body;
    const user = req.user;
    const user_id = user.id;

    try {
        const post = await Post.create({
            title,
            content,
            user_id,
        });

        res.json(post);
    } catch (error) {
        console.log(error);
        res.json({ message: error.message });
    }
});

module.exports = postRouter;
