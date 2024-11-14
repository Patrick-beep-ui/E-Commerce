const categoryButtons = document.querySelectorAll('.category');
const stockButtons = document.querySelectorAll('.stock');
const productBoxes = document.getElementsByClassName('product-box');
const sectionBox = document.querySelector('.shop-content');
let currentCategory = 'All'; // Track the currently selected category

async function getData(){
    try{
        const response = await fetch('/catalog/items/')
        const {catalog} = await response.json()
        for (const category in catalog) {
            for (const item of catalog[category]) {
                const category_name = item.category_name;
                const name = item.name;
                const price = item.price;
                const path = item.path;
                const stock = item.stock;
                OutputSectionBox(category_name, name, path, price, stock);
            }
        }
    }catch(e){
        console.log(e)
    }
}
//const data = JSON.parse(furniture);
//const data = getData()

// Loop through both Sofas and Chairs


// Function to output product information
function OutputSectionBox(category, name, path, price, stock) {
    //const itemPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);

    const div = document.createElement('div');
    const a = document.createElement('a');
    const image = document.createElement('img');
    const h2 = document.createElement('h2');
    const span = document.createElement('span');
    const i = document.createElement('i');

    div.className = 'product-box';
    div.setAttribute('data-category', category);
    div.setAttribute('data-stock', stock);

    a.href = `/sproduct?product=${name}&category=${category}&price=${price}&img=${path}`;
    // a.onclick = function () {
    //     redirectToProduct(name, price, path, category);
    // };
    image.className = 'product-img';
    h2.className = 'product-name';
    span.className = 'price';
    i.className = 'bx bx-cart-alt add-cart';

    image.src = path;
    image.alt = name;

    h2.textContent = name;
    span.textContent = `$${price}`;

    a.appendChild(image);
    div.appendChild(a);
    div.appendChild(h2);
    div.appendChild(span);
    div.appendChild(i);
    sectionBox.appendChild(div);
}



categoryButtons.forEach(categoryButton => {
    categoryButton.addEventListener('click', () => {
        currentCategory = categoryButton.innerText;

        productBoxes.forEach(box => {
            const boxCategory = box.getAttribute('data-category');

            if (currentCategory === 'All' || boxCategory === currentCategory) {
                box.style.display = 'block';
            } else {
                box.style.display = 'none';
            }

            if (categoryButton.id === 'All') {
                box.style.display = 'block';
            }
        });
    });
});

stockButtons.forEach(stockButton => {
    stockButton.addEventListener('click', () => {
        productBoxesArray.forEach(box => {
            const boxCategory = box.getAttribute('data-category');
            const stockButtonId = stockButton.id;
            const boxStock = box.getAttribute('data-stock');

            if (
                (stockButtonId === 'allStock' || (stockButtonId === 'onStock' && boxStock === 'true')) &&
                (currentCategory === 'All' || boxCategory === currentCategory)
            ) {
                box.style.display = 'block';
            } else {
                box.style.display = 'none';
            }
        });
    });
});

function redirectToProduct(name, price, imgUrl, category) {
    const url = `sproduct?product=${name}&category=${category}&price=${price}&img=${imgUrl}`
    
    console.log('Redirecting to:', url);

    window.location.href = url;
}
getData()