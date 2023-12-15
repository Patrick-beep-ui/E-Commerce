import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ProductInfo() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("16");
  const [color, setColor] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getProduct = async () => {
      try {
        //Get catalog from API
        const response = await axios('/catalog/items');
        const { catalog } = response.data;
        
        //Combines the categories into a single array
        const allProducts = Object.values(catalog).flat();

        // Find the product by ID
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

          const colors = variations[id].map((variation) =>variation.color)
          setColor(colors);

          console.log(variations); 
          console.log(colors);
        }
        catch(error) {
          console.error("Error fetching colors:", error);
        }
      }
      getColors();
    }, [id])

  const handleAddToCart = () => {
    // Implement your logic to add the product to the cart
    console.log("Add to cart button clicked");
  };

  return (
    <>
    <Header/>
    <main className="container">
      <Link to="/catalog" className="catalog-btn">Go Back to Catalog</Link>
      {product && (
        <section className="product-info">
          <div className="product-info-img">
            <img src={product.path} alt="Product Image" />
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
               {color.map((color) => {
                return (
                  <span 
                  className="item-color"
                  style={{backgroundColor: color}}
                  ></span>
                )
               })}
              </div>
            </div>
            <div className="stock product-stock">Currently on Stock: {product.stock}</div>
            <div className="cart-actions">
              <div className="quantity-input">
                <input
                  type="number"
                  name="product-quantity"
                  className="product-quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
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
