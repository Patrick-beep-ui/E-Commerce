import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useOutletContext } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ProductInfo() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("16");
  const [color, setColor] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState();
  const [cart, setCart, user] = useOutletContext();
  const [imageVariation, setImageVariation] = useState(null);
  const [notification, setNotification] = useState(""); // State for notification message

  useEffect(() => {
    if (product && product.path) {
      setImageVariation(product.path);
    }
  }, [product]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios('/catalog/items');
        const { catalog } = response.data;
        const allProducts = Object.values(catalog).flat();
        const selectedProduct = allProducts.find((item) => item.product_id === parseInt(id, 10));

        setProduct(selectedProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    getProduct();
  }, [id]);

  useEffect(() => {
    const getColors = async () => {
      try {
        const response = await axios(`/catalog/variations/${id}`)
        const {data} = response;
        const variations = data.variations
        console.log(variations);

        const colors = variations[id].map((variation) => variation.color)
        setColor(colors);

        const productImage = variations[id].map((variation) => variation)
        setSelectedImage(productImage);
      }
      catch(error) {
        console.error("Error fetching colors:", error);
      }
    }

    getColors();
  }, [id])

  const addToWhishList = async () => {
    console.log(user);
    if (!user?.id) {
      console.log("No user");
      return;
    }

    const productId = product.product_id; 
    const userId = user.id; 

    console.log(productId);

    try {
      const response = await axios.post(`/add-to-wishlist/${productId}/${user.id}`);
      console.log("Product added to wishlist", response.data);
      setNotification(""); // Clear any previous notification on success
    } catch (e) {
      console.log("Error adding to wishlist:", e.response?.data || e.message);
      setNotification(e.response?.data.message || "An error occurred while adding to the wishlist."); // Set notification with error message
    }
  
    const wishList = document.querySelector('.add-to-wishlist');
    if (wishList.className === 'bx bx-heart add-to-wishlist') {
      wishList.classList.replace('bx-heart', 'bxs-heart');
    } else {
      wishList.classList.replace('bxs-heart', 'bx-heart');
    }
  };

  const handleAddToCart = () => {
    // Avoid the amount entered to be greater than the product stock
    const quantityToAdd = Math.min(quantity, product.stock);
    addToCart(product.product_id, product.name, product.price, imageVariation, quantityToAdd);

    changeInput();
  };   

  const addToCart = (id, productName, productPrice, productImg, quantity) => {
    const existingProduct = cart.find(item => item.productName === productName);

    if (existingProduct) {
      setCart(prevCart => prevCart.map(item => {
        if (item.productName === productName) {
          return { ...item, quantity: item.quantity + quantity };
        }
        return item;
      }));
    } else {
      setCart(prevCart => [...prevCart, { id, productName, productPrice, productImg, quantity}]);
    }
  };    

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10) || 1;
    setQuantity(newQuantity);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Change the product image when clicking on any color box 
  const changeImage = (selectedColor) => {
    const image = document.querySelector('#selectedImage');

    const selectedVariation = selectedImage.find((variation) => variation.color === selectedColor);

    if (selectedVariation) {
      image.src = selectedVariation.path;

      setImageVariation(selectedVariation.path)
    }
  };

  // Reset the input value to 1 after adding an amount of products
  const changeInput = () => {
    const quantityInput = document.querySelector('.product-quantity');
    quantityInput.value = 1;

    setQuantity(1);
  };

  return (
    <>
      <Header/>
      <main className="container">
        <Link to="/catalog" className="catalog-btn">Go Back to Catalog</Link>
        {product && (
          <section className="product-info">
            <div className="product-info-img">
              <i className='bx bx-heart add-to-wishlist' onClick={addToWhishList}></i>
              <img src={product.path} alt="Product Image" id="selectedImage"/>
            </div>
            <div className="product-details">
              <div className="product-title">
                <h2 className="product-name">{product.name}</h2>
                <span className="price">${product.price}</span>
              </div>
              
              <div className="size">
                <label htmlFor="product-size">Cushions</label>
                <select
                  name="product-size"
                  className="product-size"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)} disabled
                >
                  <option value="16">3</option>
                  <option value="24">2</option>
                </select>
              </div>
              <div className="color">
                <label htmlFor="product-color">Fabric</label>
                <div className="color-boxes">
                  {color.map((color) => (
                    <span 
                      key={color}
                      className="item-color"
                      style={{ backgroundColor: color }}
                      onClick={() => changeImage(color)}
                    ></span>
                  ))}
                </div>
              </div>

              <div className="product-description">
                <p>{product.description}</p>
              </div>
              <div className="stock product-stock">Currently on Stock: {product.stock}</div>
              <div className="cart-actions">
                <div className="quantity-input">
                  <input
                    type="number"
                    name="product-quantity"
                    className="product-quantity"
                    defaultValue={quantity}
                    onChange={handleQuantityChange}
                    min={1}
                    max={product.stock}
                  />
                </div>
                <button
                  type="button"
                  className="btn-buy product-buy"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </section>
        )}
        {notification && ( // Conditional rendering of notification message
          <div className="notification">{notification}</div>
        )}
      </main>
      <Footer/>
    </>
  );
}
