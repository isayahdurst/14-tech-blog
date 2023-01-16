// Nav buttons
const signUpBtn = document.getElementById('sign-up-btn');
const logInBtn = document.getElementById('log-in-btn');

// All Modals
const overlays = document.querySelectorAll('.modal-background');
const closeBtns = document.querySelectorAll('.delete');
const cancelBtns = document.querySelectorAll('.cancel');

// Login Modal
const loginModal = document.getElementById('login-modal');
const submitLoginBtn = document.getElementById('submit-login');
const cancelLogin = document.getElementById('cancel-login');

const loginUsername = document.getElementById('username');
const loginPassword = document.getElementById('password');
const loginError = document.getElementById('loginError');

// Signup Modal
const signupModal = document.getElementById('signup-modal');
const submitSignupBtn = document.getElementById('submit-signup');
const cancelSignupBtn = document.querySelector('cancel-signup');

const firstNameEl = document.getElementById('first_name_signup');
const lastNameEl = document.getElementById('last_name_signup');
const usernameEl = document.getElementById('username_signup');
const emailEl = document.getElementById('email_signup');
const passwordEl = document.getElementById('password_signup');

const signupError = document.getElementById('signupError');

const openLoginModal = function () {
    loginModal.classList.add('is-active');
};

const closeLoginModal = function () {
    loginModal.classList.remove('is-active');
    clearInputFields();
    clearHelp();
};

const openSignupModal = function () {
    signupModal.classList.add('is-active');
};

const closeSignupModal = function () {
    signupModal.classList.remove('is-active');
    clearInputFields();
    clearHelp();
};

const clearInputFields = function () {
    // login fields
    loginUsername.value = '';
    loginPassword.value = '';

    // signup fields
    firstNameEl.value = '';
    lastNameEl.value = '';
    usernameEl.value = '';
    emailEl.value = '';
    passwordEl.value = '';
};

const clearHelp = function () {
    loginError.textContent = '';
    signupError.textContent = '';
};

const loginFormHandler = async function () {
    const username = loginUsername.value;
    const password = loginPassword.value;

    try {
        if (!username) {
            throw new Error('Enter a username.');
        } else if (!password) {
            throw new Error('Enter a password');
        }
    } catch (error) {
        loginError.textContent = error.message;
    }

    try {
        const response = await fetch('api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const message = await response.json();
        console.log(message);
        setTimeout(() => {
            window.location.replace('/');
        }, 1000);
    } catch (error) {
        console.log(error);
        loginError.textContent = error.message;
    }
};

const signupFormHandler = async function (event) {
    event.preventDefault();
    const first_name = firstNameEl.value;
    const last_name = lastNameEl.value;
    const username = usernameEl.value;
    const email = emailEl.value;
    const password = passwordEl.value;

    if (!first_name || !last_name || !username || !email || !password) {
        signupError.textContent = 'Please complete the entire form';
        return;
    }

    try {
        const response = await fetch('/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first_name,
                last_name,
                email,
                username,
                password,
            }),
        });

        const { message } = await response.json();
        setTimeout(() => {
            window.location.replace('/');
        }, 1000);
        console.log(message);
    } catch (error) {
        console.log(error.message);
    }
};

logInBtn?.addEventListener('click', openLoginModal);

[...overlays].forEach((overlay) =>
    overlay.addEventListener('click', function () {
        closeLoginModal();
        closeSignupModal();
    })
);

[...closeBtns, ...cancelBtns].forEach((button) =>
    button.addEventListener('click', function () {
        closeLoginModal();
        closeSignupModal();
    })
);

signUpBtn?.addEventListener('click', openSignupModal);

submitLoginBtn.addEventListener('click', loginFormHandler);
submitSignupBtn.addEventListener('click', signupFormHandler);
