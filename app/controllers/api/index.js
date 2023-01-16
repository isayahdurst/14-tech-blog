const { Router } = require('express');

const commentRouter = require('./comments');
const postRouter = require('./posts');
const userRouter = require('./user');

const apiRouter = new Router();

apiRouter.use('/user', userRouter);
apiRouter.use('/comment', commentRouter);
apiRouter.use('/post', postRouter);

module.exports = apiRouter;
