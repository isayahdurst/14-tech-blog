const posts = document.querySelectorAll('.post');

posts.forEach((post) =>
    post.addEventListener('click', function (event) {
        const post_id = event.currentTarget.getAttribute('data-postID');
        window.location.replace('/post/' + post_id);
    })
);
