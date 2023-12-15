document.addEventListener("DOMContentLoaded", function() {
    const signupForm = document.querySelector('#sign-up');
    const loginForm = document.querySelector('#login');
    const loginBtn = document.querySelector('#login-btn');
    const signUpBtn = document.querySelector('#sign-up-btn');
    const loginImage = document.querySelector('#login .login-img');
    const signupImage = document.querySelector('#sign-up .login-img');
    const movingImage = document.querySelector('.moving-img');

    loginImage.style.visibility = 'hidden';
    signupImage.style.visibility = 'hidden';

    loginBtn.onclick = function() {
        loginForm.style.display = 'grid';
        movingImage.style.transform = 'translateX(100%)';
        signupForm.style.display = 'none';
    };

    signUpBtn.onclick = function() {
        signupForm.style.display = 'grid';
        movingImage.style.transform = 'translateX(0%)';
        loginForm.style.display = 'none';
    };

    const logoutBtn = document.querySelector('#logout-btn');
    logoutBtn.addEventListener('click', function() {
        logoutUser();
    });

    const signupUserBtn = document.querySelector('#signup-btn');
    signupUserBtn.onclick = function(event) {
        event.preventDefault();
        signupUser();
    };

    const loginFormButton = document.querySelector('#login');
    loginFormButton.addEventListener('submit', function(event) {
        event.preventDefault();
        loginUser();
    });
});

async function loginUser() {
    const email = document.getElementById('user-email').value;
    const password = document.getElementById('user-password').value;

    try {
        // Use a CDN to import Axios
        const axios = await import('https://cdn.skypack.dev/axios');

        // Make the API request using Axios
        const response = await axios.default.post('/login', { email, password });

        // Handle the response
        const { data } = response;
        console.log(data);
    } catch (error) {
        console.error(error);

        // Add logic to handle login failure (e.g., display an error message)
    }
}

//Sign-Up Function 
async function signupUser() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('new-user-email').value;
    const password = document.getElementById('new-user-password').value;

    try {
        const axios = await import('https://cdn.skypack.dev/axios');
        const response = await axios.default.post('/signup', { name, email, password });
        const { data } = response;
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

async function logoutUser() {
    try {
        const axios = await import('https://cdn.skypack.dev/axios');
        const response = await axios.default.get('/logout');
        const { is_auth } = response.data;
        console.log('Logout successful');
    } catch (error) {
        console.error('Logout error:', error);
    }
}
