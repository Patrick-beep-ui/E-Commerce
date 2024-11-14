<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles/sproduct.css">
    <link rel="stylesheet" href="styles/payment.css">
    <link rel="stylesheet" href="styles/checkout.css">
    <title>Check-Out</title>
</head>
<body>
    <main class="container payment-box">

        <a href="catalog.html">Back to Shop</a>
        <div class="form-container">
            <form action="" method="POST" class="form" id="check-out">

                <div class="cart-box">
                    <div class="product-box">
                        <figure class="product-img">
                            <img src="img/Josh.jpg" alt="Product Image" class="cart-img">
                           </figure>
                            <div class="detail-box">
                               <div class="product-cart-detail">
                                <h3 class="cart-product-title">Product Name</h3>
                                <span class="cart-quantity">x 1</span>
                               </div>
                                <div class="product-cart-price">
                                    <span class="cart-price">$19.99</span>
                                </div>
                            </div>
                    </div>
                    <div class="product-box">
                        <figure class="product-img">
                            <img src="img/product1.jpg" alt="Product Image" class="cart-img">
                           </figure>
                            <div class="detail-box">
                               <div class="product-cart-detail">
                                <h3 class="cart-product-title">Product Name</h3>
                                <span class="cart-quantity">x 1</span>
                               </div>
                                <div class="product-cart-price">
                                    <span class="cart-price">$19.99</span>
                                </div>
                            </div>
                    </div>
                    <div class="product-box">
                        <figure class="product-img">
                            <img src="img/product1.jpg" alt="Product Image" class="cart-img">
                           </figure>
                            <div class="detail-box">
                               <div class="product-cart-detail">
                                <h3 class="cart-product-title">Product Name</h3>
                                <span class="cart-quantity">x 1</span>
                               </div>
                                <div class="product-cart-price">
                                    <span class="cart-price">$19.99</span>
                                </div>
                            </div>
                    </div>
                    <div class="product-box">
                        <figure class="product-img">
                            <img src="img/product1.jpg" alt="Product Image" class="cart-img">
                           </figure>
                            <div class="detail-box">
                               <div class="product-cart-detail">
                                <h3 class="cart-product-title">Product Name</h3>
                                <span class="cart-quantity">x 1</span>
                               </div>
                                <div class="product-cart-price">
                                    <span class="cart-price">$19.99</span>
                                </div>
                            </div>
                    </div>
                    <div class="product-box">
                        <figure class="product-img">
                            <img src="img/product1.jpg" alt="Product Image" class="cart-img">
                           </figure>
                            <div class="detail-box">
                               <div class="product-cart-detail">
                                <h3 class="cart-product-title">Product Name</h3>
                                <span class="cart-quantity">x 1</span>
                               </div>
                                <div class="product-cart-price">
                                    <span class="cart-price">$19.99</span>
                                </div>
                            </div>
                    </div>
                    <div class="total">
                        <h4 class="total-title">Total</h4>
                        <span class="total-price">$0</span>
                    </div>
                    
                   
                </div>
                <div class="check-out" id="payment">
                    <h1>Check-Out</h1>
                    <div class="form-group">
                        <h3 class="card-details-title">Shipping Info</h3>
                        <label for="contact-email">Contact Email</label>
                        <input type="email" name="contact-email" id="contact-email" class="payment-input">
                    </div>
                    <div class="form-group">
                        <label for="address">Shipping Address</label>
                        <input type="text" name="address-name" id="address-name" class="payment-input" placeholder="Name" required>
                        <select name="" id="" class="payment-input">
                            <option value="Masaya">Masaya</option>
                            <option value="Managua">Managua</option>
                            <option value="Granada">Granada</option>
                            <option value="Rivas">Rivas</option>
                            <option value="Matagalpa">Matagalpa</option>
                            <option value="Leon">Leon</option>
                        </select>
                        <input type="text" name="full-address" id="full-address" class="payment-input" placeholder="Address" required>
                    </div>
                    <div class="form-group">
                        <h3 class="card-details-title">Card Details</h3>
                        <label for="name">Cardholder's name</label>
                        <input type="text" name="cardholder-name" id="cardholder-name" class="payment-input">
                    </div>
                    <div class="form-group">
                        <label for="card-number">Card Number</label>
                        <input type="text" name="card-number" id="card-number" class="payment-input" required>
                    </div>
                    <div class="card-details">
                        <div class="form-group">
                        <label for="exp-date">Exp. Date</label>
                        <input type="text" name="exp-date" id="exp-date" placeholder="mm/yy" class="payment-input">
                        </div>
                        <div class="form-group">
                            <label for="cvv">CVV</label>
                        <input type="number" name="cvv" id="cvv" class="payment-input">
                        </div>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn-sign btn-buy">Complete Order</button>
                    </div>
                </div>
            </form>
        </div>
        
    </main>
</body>
</html>