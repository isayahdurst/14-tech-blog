const { Router } = require('express');
const Comment = require('../../models/Comment');
const auth = require('../../middleware/auth');

const commentRouter = new Router();

commentRouter.post('/', auth, async (req, res) => {
    const { content, post_id } = req.body;
    const user = req.user;

    const comment = await Comment.create({
        content,
        post_id,
        user_id: user.id,
    });

    if (comment) {
        res.json(comment);
    } else {
        res.json({ message: "Couldn't post comment" });
    }
});

module.exports = commentRouter;
