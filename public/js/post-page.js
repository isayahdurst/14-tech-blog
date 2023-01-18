const commentEl = document.getElementById('comment-content');
const commentSection = document.getElementById('blog-comments');
const postSection = document.getElementById('blog-post');

const submitCommentBtn = document.getElementById('submit-comment');

// Edit Post
const editSection = document.getElementById('edit-post-section');
const editBtn = document.getElementById('edit-post-btn');
const editTitle = document.getElementById('edit-post-title');
const editContent = document.getElementById('edit-post-content');
const submitEditBtn = document.getElementById('submit-edit');
const cancelEditBtn = document.getElementById('cancel-edit');

// Delete Post
const deletePostBtn = document.getElementById('delete-post-btn');

const hidePost = function () {
    postSection.classList.add('is-hidden');
};

const hideComments = function () {
    commentSection.classList.add('is-hidden');
};

const showPost = function () {
    postSection.classList.remove('is-hidden');
};

const showComments = function () {
    commentSection.classList.remove('is-hidden');
};

const showEditSection = function () {
    hidePost();
    hideComments();
    editSection.classList.remove('is-hidden');
};

const cancelEdit = function (event) {
    event.preventDefault();
    showPost();
    showComments();
    editSection.classList.add('is-hidden');
};

const addComment = async function (event) {
    const content = commentEl.value;
    const post_id = event.currentTarget.getAttribute('data-postID');
    if (!content) {
        return;
    }

    if (!post_id) return;

    try {
        const response = await fetch('/api/comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content,
                post_id,
            }),
        });

        const comment = await response.json();

        window.location.reload();
    } catch (error) {}
};

const editPost = async function (event) {
    event.preventDefault();

    const newTitle = editTitle.value;
    const newContent = editContent.value;
    const post_id = event.currentTarget.getAttribute('data-postID');

    const response = await fetch('/api/post', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            post_id,
            newTitle,
            newContent,
        }),
    });

    const post = await response.json();
    window.location.reload();
};

const deletePost = async function (event) {
    event.preventDefault();

    const post_id = event.currentTarget.getAttribute('data-postID');

    await fetch('/api/post/', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            post_id,
        }),
    });

    window.location.replace('/');
};

submitCommentBtn?.addEventListener('click', addComment);
cancelEditBtn?.addEventListener('click', cancelEdit);
editBtn?.addEventListener('click', showEditSection);
submitEditBtn?.addEventListener('click', editPost);
deletePostBtn?.addEventListener('click', deletePost);
