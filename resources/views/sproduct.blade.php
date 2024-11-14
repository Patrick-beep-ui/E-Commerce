<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE-Edge">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="styles/style.css">
    <script src="js/data.json"></script>
    <script src="js/product.js" defer></script>
    <title>SUP</title>
</head>
<body>
    <header>
        <nav class="nav container">
                <i class='bx bx-search-alt-2' id="search-icon"></i>
                <div class="search-icon"></div>
                <div class="logo"><a href="index.html">SUP</a></div>
                <div class="user-icons">
                    <i class='bx bx-cart-alt' id="cart-icon"></i>
                    <i class='bx bxs-user-circle' id="user-icon"></i> 
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

                        <button type="button" class="btn-buy">Buy Now</button>

                        <i class='bx bx-x' id="close-cart"></i>
                    </div>
                </section> 
                
        </nav>
    </header>

    <main class="container">
        <button><a href="{{ route('catalog') }}">Go Back to Catalog</a></button>
        <section class="product-info">
            <div class="product-info-img">
                <img src="#" alt="Product Image">
            </div>
            <div class="product-details">
                <div class="product-title">
                    <h2 class="product-name">Product One</h2>
                    <span class="price">$10</span>
                </div>
                <div class="size">
                    <label for="product-size">Cushions</label>
                    <select name="product-size" class="product-size">
                        <option value="16">3</option>
                        <option value="24">2</option>
                    </select>
                </div>
                <div class="color">
                    <label for="product-color">Fabric</label>
                    <div class="color-boxes">
                        <!--
                        <span class="item-color"></span>
                        <span class="item-color"></span>
                        <span class="item-color"></span>
                        <span class="item-color"></span>
                    -->
                    </div>

                </div>
                <div class="stock product-stock">
                    Currently on Stock
                </div>
                <div class="cart-actions">
                    <div class="quantity-input">
                        <input type="number" name="product-quantity" class="product-quantity" value="1">
                    </div>
                    <button type="button" class="btn-buy product-buy">Add to Cart</button>
                </div>                
            </div>
        </section>
    </main>
    <script src="js/main.js"></script>
</body>
</html>