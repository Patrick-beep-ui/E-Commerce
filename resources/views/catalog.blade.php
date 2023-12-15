<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE-Edge">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="styles/style.css">
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="js/product.js" defer></script>
    <script src="js/catalog.js" defer></script> 
    <script src="js/main.js" defer></script>
    <script src="js/order.js" defer></script>
    
    <title>SUP</title>
</head>
<body>
    <header>
        <nav class="nav container">
                <i class='bx bx-search-alt-2' id="search-icon"></i>
                <div class="search-icon"></div>
                <div class="logo"><a href='index'>SUP</a></div>
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

                        <!-- {{ route('payment') }} -->

                        <button type="button" class="btn-buy pay"><a href="#">Buy Now</a></button>
                        <button type="button" class="btn-buy browse">Continue Browsing</button>


                        <i class='bx bx-x' id="close-cart"></i>
                    </div>
                </section> 
                
        </nav>
    </header>
        <main class="shop container">
            <div class="filter">
                <div class="category-buttons">
                    <button class="btn-buy category">Chair</button>
                    <button class="btn-buy category">Sofa</button>
                    <button class="btn-buy category">Living</button>
                    <button class="btn-buy category" id="All">All</button>
                </div>
                <div class="stock-buttons">
                    <button class="btn-buy stock" id="onStock">In Stock</button>
                    <button class="btn-buy stock" id="allStock">All</button>
                </div>
            </div>
            <h2 class="section-title">Catalog</h2>

            <section class="shop-content">
            
            </section>
        </main>
        <footer>

        </footer>
</body>
</html>