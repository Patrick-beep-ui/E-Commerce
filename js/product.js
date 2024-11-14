const colorBox = document.querySelector('.color-boxes');

// Function to get URL parameters
function getURLParams() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams;
}

function updateProductInfo() {
    const params = getURLParams();
    const productName = params.get('product');
    const price = params.get('price');
    const imgUrl = params.get('img');
    const category = params.get('category');

    // Format the price to dollars 
    const itemPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);

    // Update product information
    document.querySelector('.product-name').textContent = productName;
    document.querySelector('.price').textContent = itemPrice;

    // Update product image
    const productImage = document.querySelector('.product-info-img img');
    
    if (productImage) {
        productImage.src = imgUrl;
    }

    const currentProduct = values[0].Sofas.find(sofa => sofa.name === productName) || values[0].Chairs.find(chair => chair.name === productName) || values[0].Living.find(living => living.name === productName);

    // Display colors of the current product family
    if (currentProduct) {
        colorSpan(currentProduct.colors);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    updateProductInfo();
});

function redirectToProduct(productName, price, imgUrl, category) {
    const queryString = new URLSearchParams({
        'product': productName,
        'price': price,
        'img': imgUrl,
        'category': category
    }).toString();

    // Update the URL and navigate to sproduct.html with parameters
    window.location.href = 'sproduct.html?' + queryString;
}

function colorSpan(colors) {
    colorBox.textContent = ''; // Clear previous colors

    for (const color of colors) {
        const span = document.createElement('span');
        span.className = 'item-color';
        span.style.backgroundColor = color;
        span.style.cursor = 'pointer';

        span.addEventListener('click', function() {
            updateProductImage(color);
        });
        colorBox.appendChild(span);
    }
}

function updateProductImage(color) {
    const productImage = document.querySelector('.product-info-img img');

    const currentValue = values[0].Sofas.find(sofa => sofa.colors.includes(color)) || values[0].Chairs.find(chair => chair.colors.includes(color)) || values[0].Living.find(living => living.colors.includes(color));

    //const currentValue = values[0].category.find(item => item.colors.includes(color))

    // Check if the sofa is found
    if (currentValue) {
        const variation = currentValue.variations.find(variation => variation.color === color);

        if (variation) {
            productImage.src = `img/${variation.file}`;
        }
    }
}