const logout = async (event) => {
    event.preventDefault();

    const respnse = await fetch('/api/user/logout');

    if (respnse.ok) {
        window.location.replace('/');
    }
};

document.getElementById('logout').addEventListener('click', logout);
