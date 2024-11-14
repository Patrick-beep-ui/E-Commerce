import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import {useOutletContext, useNavigate} from "react-router-dom";
import axios from "axios"; 

export default function Login() {
    const [imgVisibility, setImgVisibility] = useState('hidden')
    const [cart, setCart, user, setUser] = useOutletContext()
    const navigate = useNavigate();

    let signupForm
    let loginForm 
    let signUpBtn 
    let loginImage 
    let signupImage 
    let movingImage

    function displayLogin() {
        loginForm.style.display = 'grid';
        movingImage.style.transform = 'translateX(100%)';
        signupForm.style.display = 'none';
    }
    function displaySignup() {
        signupForm.style.display = 'grid';
        movingImage.style.transform = 'translateX(0%)';
        loginForm.style.display = 'none';
    }

    async function loginUser() {
        const email = document.getElementById('user-email').value;
        const password = document.getElementById('user-password').value;
    
        try {
    
            // Make the API request using Axios
            const response = await axios.post('/login', { email, password });
    
            // Handle the response
            const { data:{user} } = response;
            setUser(user)
            localStorage.setItem("user", JSON.stringify(user));
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    }
    
    async function signupUser() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('new-user-email').value;
        const password = document.getElementById('new-user-password').value;
    
        try {
            const response = await axios.post('/signup', { name, email, password });
            const { data:{user} } = response;
            setUser(user)
            localStorage.setItem("user", JSON.stringify(user));
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    }
    
    async function logoutUser() {
        try {
            const response = await axios.get('/logout');
            const { is_auth } = response.data;
            console.log('Logout successful');
        } catch (error) {
            console.error('Logout error:', error);
        }
    }
    
    useEffect(function () {
         signupForm = document.querySelector('#sign-up');
         loginForm = document.querySelector('#login');
         signUpBtn = document.querySelector('#sign-up-btn');
         loginImage = document.querySelector('#login .login-img');
         signupImage = document.querySelector('#sign-up .login-img');
         movingImage = document.querySelector('.moving-img');
        const body = document.querySelector("body")
        body.className = "login-body"
    })
    return (
        <>
            <main className="container login-main">
                <Link to={"/"} className="home-btn">Home</Link>
                <div className="form-container">
                    <div className="moving-img">
                        <img src="/img/login1.jpeg" alt="" height="100%"/>
                    </div>
                    <form action="{{ route('signup') }}" method="POST" className="form" id="sign-up">
                        <div className="login-img" style={{ visibility: imgVisibility }}>
                            <img src="/img/login1.jpeg" alt=""/>
                        </div>
                        <div className="login-user" id="signup-user">
                <Link to={"/"} className="home-btn" style={{display: "none"}}>Home</Link>
                            <h1>Sign-Up</h1>
                            <div className="form-group">
                                <input type="text" name="name" id="name" placeholder="Name" />
                            </div>
                            <div className="form-group">
                                <input type="email" name="email" id="new-user-email" placeholder="Email" />
                            </div>
                            <div className="form-group">
                                <input type="password" name="password" id="new-user-password" placeholder="Password" />
                            </div>
                            <div className="form-group">
                                <button type="button" onClick={signupUser} className="btn-sign btn-buy" id="signup-btn">Sign-Up</button>
                            </div>
                            <span className="btn-form" id="login-btn" onClick={displayLogin}>Login</span>
                        </div>
                    </form>
                    <form action="" method="POST" className="form" id="login">
                        <div className="login-img" style={{ visibility: imgVisibility }}>
                            <img src="/img/login1.jpeg" alt=""/>
                        </div>
                        <div className="login-user" id="login-user">
                        <Link to={"/"} className="home-btn" style={{display: "none"}}>Home</Link>
                            <h1>Log In</h1>
                            <div className="form-group">
                                <input type="email" name="email" id="user-email" placeholder="Email" />
                            </div>
                            <div className="form-group">
                                <input type="password" name="password" id="user-password" placeholder="Password" />
                            </div>
                            <span className="btn-form" id="forgotpass-btn"><a href="">Forgot Password?</a></span>
                            <div className="form-group">
                                <button type="button" className="btn-sign btn-buy" id="login-btn" onClick={loginUser}>Login</button>
                            </div>
                            <span className="btn-form" id="sign-up-btn" onClick={displaySignup}>Sign-Up</span>
                        </div>
                    </form>
                </div>
            </main>

        </>
    )
}
