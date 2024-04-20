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
  const [cart, setCart] = useOutletContext();

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
        const response = await axios('/catalog/variations')
        const {data} = response;
        const variations = data.variations

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

  const handleAddToCart = () => {
    //Avoid the amount entred to be greater than the product stock
    const quantityToAdd = Math.min(quantity, product.stock);
    addToCart(product.product_id, product.name, product.price, product.path, quantityToAdd);

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

  //change the product image when clicking on any color box 
  const changeImage = (selectedColor) => {
    const image = document.querySelector('#selectedImage');

    const selectedVariation = selectedImage.find((variation) => variation.color === selectedColor);

    if (selectedVariation) {
      image.src = selectedVariation.path;
    }
  };

  //Reset the input value to 1 after adding an amount of products
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
                  onChange={(e) => setSelectedSize(e.target.value)}
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
      </main>
      <Footer/>
    </>
  );
}
