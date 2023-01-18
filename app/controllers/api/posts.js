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

postRouter.put('/', auth, async (req, res) => {
    const { newTitle, newContent, post_id } = req.body;
    const user = req.user;

    try {
        const post = await Post.update(
            {
                title: newTitle,
                content: newContent,
            },
            {
                where: {
                    id: post_id,
                },
            }
        );

        res.json(post);
    } catch (error) {
        console.log(error);
        res.json({ message: 'update failed.' });
    }
});

postRouter.delete('/', async (req, res) => {
    const { post_id } = req.body;
    try {
        await Post.destroy({
            where: {
                id: post_id,
            },
        });
        res.end();
    } catch (error) {
        res.json({ message: 'error occured' });
    }
});

module.exports = postRouter;
