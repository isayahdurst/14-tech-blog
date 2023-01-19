const postForm = document.getElementById('post-form');
const submitPostBtn = document.getElementById('submit-post-btn');
const cancelPostBtn = document.getElementById('cancel-post-btn');
const titleEl = document.getElementById('post-title');
const contentEl = document.getElementById('post-content');
const posts = document.querySelectorAll('.post');

const createPostBtn = document.getElementById('create-post-btn');

const submitPostHandler = async function (event) {
    event.preventDefault();
    const title = titleEl.value;
    const content = contentEl.value;

    try {
        const response = await fetch('/api/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                content,
            }),
        });
        const post = await response.json();
    } catch (error) {
        console.log(error);
    }

    window.location.reload();
};

const openPostForm = function () {
    postForm.classList.remove('is-hidden');
    createPostBtn.classList.add('is-hidden');
};

const closePostForm = function (event) {
    event.preventDefault();
    postForm.classList.add('is-hidden');
    createPostBtn.classList.remove('is-hidden');
};

createPostBtn.addEventListener('click', openPostForm);
cancelPostBtn.addEventListener('click', closePostForm);
submitPostBtn.addEventListener('click', submitPostHandler);

[...posts].forEach((post) =>
    post.addEventListener('click', function (event) {
        const post = event.currentTarget;
        const postID = post.getAttribute('data-id');
        window.location = `/post/${postID}`;
    })
);
