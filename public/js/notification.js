const notifications = document.querySelectorAll('.notification');

[...notifications].forEach((notification) =>
    notification.addEventListener('click', function (event) {
        const button = event.target;
        if (button.classList.contains('delete')) {
            notification.classList.add('is-hidden');
        }
    })
);
