const logoutBtn = document.getElementById('logout');

const logout = async (event) => {
    event?.preventDefault();

    const response = await fetch('/api/user/logout', {
        redirect: 'follow',
    });

    if (response.redirected) {
        window.location.href = response.url;
    }
};

const timer = {
    timeRemaining: 1000 * 5 * 60,
    resetTimer() {
        this.timeRemaining = 1000 * 5 * 60;
    },

    startTimer() {
        const interval = setInterval(() => {
            if (this.timeRemaining > 0) {
                this.timeRemaining -= 1000;
            } else {
                clearInterval(interval);
                logout();
            }
        }, 1000);
    },
};

document.getElementById('logout')?.addEventListener('click', logout);
document.addEventListener('mousemove', function () {
    timer.resetTimer();
});
document.addEventListener('input', function () {
    timer.resetTimer();
});

if (logoutBtn) {
    timer.startTimer();
}
