document.addEventListener('DOMContentLoaded', function () {
    const cartIcon = document.querySelector('#cart-icon');
    const cart = document.querySelector('.cart');
    const closeCart = document.querySelector('#close-cart');
    const buyButton = document.querySelector('.pay');
    const browseButton = document.querySelector('.browse');
    const body = document.querySelector('.body');
    document.querySelector('.btn-buy.pay').addEventListener("click", buyButtonClicked);

    // Open Cart
    cartIcon.addEventListener('click', () => {
        cart.classList.add('active');
    });

    // Close Cart
    closeCart.addEventListener('click', () => {
        cart.classList.remove('active');
    });

    // Reinitialize Event Listeners
    function initializeEventListeners() {
        // Add to Cart
        document.querySelector('.shop-content').addEventListener('click', function (event) {
            if (event.target.classList.contains('add-cart')) {
                addToCartItem(event);
            }
        });

        // Buy Button
        document.querySelector('.btn-buy').addEventListener('click', buyButtonClicked);
        ready();
    }

    initializeEventListeners();

    // Buy Button Functionality
    function buyButtonClicked(e) {
        alert('Your Order is placed');
        let cartContent = document.querySelector('.cart-content');
        while (cartContent.hasChildNodes()) {
            cartContent.removeChild(cartContent.firstChild);
        }

        updateTotalAmount();
    }

    function addToCartItem(e) {
        const buttonClicked = e.target;
        //extract the product's values
        const productId = buttonClicked.parentElement;
        const productName = productId.getElementsByClassName('product-name')[0].innerText;
        const productPrice = productId.getElementsByClassName('price')[0].innerText;
        const productImg = productId.getElementsByClassName('product-img')[0].src;
        //end extraction
        
        buyButton.classList.add('active');
        browseButton.classList.add('active');

        addProductToCart(productName, productPrice, productImg);
        updateTotalAmount();
    }

    // Cart Working JS
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', ready);
    } else {
        ready();
    }

    // Remove Items from Cart
    async function ready() {
        const removeCartItems = document.getElementsByClassName('cart-remove');
        for (let i = 0; i < removeCartItems.length; i++) {
            let button = removeCartItems[i];
            button.addEventListener("click", removeCartItem);
        }

        const quantityItems = document.getElementsByClassName('cart-quantity');
        for (let i = 0; i < quantityItems.length; i++) {
            let input = quantityItems[i];
            input.addEventListener("change", amountChanged);
        }

        // Add to Cart
        const addToCart = document.getElementsByClassName('add-cart');
        for (let i = 0; i < addToCart.length; i++) {
            let button = addToCart[i];
            button.addEventListener("click", addToCartItem);
        }

        // Buy Button
        document.getElementsByClassName('btn-buy')[0].addEventListener("click", buyButtonClicked);
    }

    // Buy Button Function
    function buyButtonClicked(e) {
        alert('Your Order is placed');
        let cartContent = document.getElementsByClassName('cart-content')[0];
        while (cartContent.hasChildNodes()) {
            cartContent.removeChild(cartContent.firstChild);
        }

        updateTotalAmount();
    }

    // Reinitialize Event Listeners after Adding Products
    function reinitializeEventListeners() {
        initializeEventListeners();
    }

    function addToCartItem(e) {
        const buttonClicked = e.target;
        const productId = buttonClicked.parentElement;
        const productName = productId.getElementsByClassName('product-name')[0].innerText;
        const productPrice = productId.getElementsByClassName('price')[0].innerText;
        const productImg = productId.getElementsByClassName('product-img')[0].src;

        buyButton.classList.add('active');
        browseButton.classList.add('active');

        addProductToCart(productName, productPrice, productImg);
        updateTotalAmount();
    }

    async function addProductToCart(productName, productPrice, productImg) {
        let cartShopBox = document.createElement('div');
        cartShopBox.classList.add('cart-box');
        let cartItems = document.getElementsByClassName('cart-content')[0];
        let cartItemNames = cartItems.getElementsByClassName('cart-product-title');
        for (let i = 0; i < cartItemNames.length; i++) {
            if (cartItemNames[i].innerText == productName) {
                alert('You have already added this product to the cart');
                return;
            }
        }

        let cartBoxContent = `
            <img src="${productImg}" alt="" class="cart-img">
            <div class="detail-box">
                <h3 class="cart-product-title">${productName}</h3>
                <span class="cart-price">${productPrice}</span>
                <input type="number" class="cart-quantity" name="cart-quantity" id="" value="1">
            </div>
            <i class='bx bx-trash cart-remove'></i>
        `;
        cartShopBox.innerHTML = cartBoxContent;
        cartItems.append(cartShopBox);
        cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
        cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', amountChanged);
    }

    function removeCartItem(e) {
        let buttonClicked = e.target;
        buttonClicked.parentElement.remove(); // Removes cart-remove parent element
        updateTotalAmount();
    }

    // Change Amount
    function amountChanged(e) {
        let input = e.target;
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1;
        }
        updateTotalAmount();
    }

    // Update Total Amount
    function updateTotalAmount() {
        let cartContent = document.getElementsByClassName('cart-content')[0];
        let cartBoxes = cartContent.getElementsByClassName('cart-box');
        let total = 0;
        for (let i = 0; i < cartBoxes.length; i++) {
            let cartBox = cartBoxes[i];
            let price = cartBox.getElementsByClassName('cart-price')[0];
            let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
            let priceValue = parseFloat(price.innerText.replace('$', ''));
            let quantity = quantityElement.value;
            total = total + priceValue * quantity;
        }

        // If price contains cents
        total = Math.round(total * 100) / 100;

        document.querySelector('.total-price').innerText = '$' + total;
    }

    //Order Rendering

    
});
