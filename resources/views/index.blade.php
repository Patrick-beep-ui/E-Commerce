<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE-Edge">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="styles/style.css">
    <link rel="text/javascript" href="js/main.js">
    <title>SUP</title>
</head>
<body>
    <header>
        <nav class="nav container">
                <i class='bx bx-search-alt-2' id="search-icon"></i>
                <div class="search-icon"></div>
                <div class="logo">SUP </div>
                <div class="user-icons">
                    <i class='bx bx-cart-alt' id="cart-icon"></i>
                    <a href="{{ route('login') }}">
                        <i class='bx bxs-user-circle' id="user-icon"></i> 
                    </a>
                </div>
                <section class="cart">
                    <h2 class="cart-title">Your Products</h2>
                    <div class="cart-content">
                        </div>

                    </div>

                        <!-- Total -->
                        <div class="total">
                            <h4 class="total-title">Total</h4>
                            <span class="total-price">$0</span>
                        </div>

                        <button type="button" class="btn-buy pay">Buy Now</button>
                        <button type="button" class="btn-buy browse">Continue Browsing</button>


                        <i class='bx bx-x' id="close-cart"></i>
                    </div>
                </section> 
                
        </nav>
    </header>
    <div class="back-img">
        <h2>Design That Inspires</h2>
    </div>
        <main class="shop container">

            <section class="goal section">
                <div class="goal title">
                    <h3>Our Goal</h3>
                    <p>In a world where convenience is key, our app is designed to be your one-stop-shop for everything related to furniture!</p>
                </div>
                <div class="goal-images">
                        <img src="img/goal-image1.jpg" alt="" class="product-img">
                        <img src="img/goal-image2.jpg" alt="" class="product-img">
                        <img src="img/goal-image3.jpg" alt="" class="product-img">
                </div>
            </section>

            <section class="description section">
                <div class="description title flex">
                    <h3>Our Service</h3>
                    <p>Streamline the purchase process. Access a diverse range of high-quality products anytime, anywhere.</p>
                </div>
                <div class="description-image">
                    <img src="img/description-image.jpg" alt="">
                </div>
                
                <h4><a href="{{ route('catalog') }}" id="catalog-link">Go to Catalog 
                    <span class="svg svg__arrow" aria-hidden="true"><svg aria-hidden="true" focusable="false" role="presentation" enable-background="new -19 23 66 16" viewBox="-19 23 66 16" xmlns="http://www.w3.org/2000/svg"><path d="m-19 29.6h64v2.9h-64z"></path><path d="m47 31-2-2-6-6-2 2 5.9 6-5.9 6 2 2 6-6z"></path></svg></span>
                </a></h4>
            </section>

        </main>
        <footer>

        </footer>
        <script src="js/main.js"></script>
</body>
</html>