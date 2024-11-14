<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles/style.css">
    <title>Document</title>
</head>
<body class="login-body">
    <main class="container login-main">
        <a href="index.html">Home</a>
        <button id="logout-btn">Log-Out</button>
        <div class="form-container">
            <div class="moving-img">
                <img src="img/login1.jpeg" alt="" height="100%">
            </div>
            <form action="{{ route('signup') }}" method="POST" class="form" id="sign-up">
                @csrf
                <div class="login-img">
                    <img src="img/login1.jpeg" alt="">
                </div>
                <div class="login-user" id="signup-user">
                    <h1>Sign-Up</h1>
                    <div class="form-group">
                        <input type="text" name="name" id="name" placeholder="Name">
                    </div>
                    <div class="form-group">
                        <input type="email" name="email" id="new-user-email" placeholder="Email">
                    </div>
                    <div class="form-group">
                        <input type="password" name="password" id="new-user-password" placeholder="Password">
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn-sign btn-buy" id="signup-btn">Sign-Up</button>
                    </div>
                    <span class="btn-form" id="login-btn">Login</span>
                </div>
            </form>
            <form action="" method="POST" class="form" id="login">
                <div class="login-img">
                    <img src="img/login1.jpeg" alt="">
                </div>
                <div class="login-user" id="login-user">
                    <h1>Log In</h1>
                    <div class="form-group">
                        <input type="email" name="email" id="user-email" placeholder="Email">
                    </div>
                    <div class="form-group">
                        <input type="password" name="password" id="user-password" placeholder="Password">
                    </div>
                    <span class="btn-form" id="forgotpass-btn"><a href="">Forgot Password?</a></span>
                    <div class="form-group">
                        <button type="submit" class="btn-sign btn-buy" id="login-btn">Login</button>
                    </div>
                    <span class="btn-form" id="sign-up-btn">Sign-Up</span>
                </div>
            </form>
        </div>
    </main>

    <!-- JavaScript at the end of the document -->
    <script type="module" src="js/login.js" defer></script>
</body>
</html>
