import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Header from "../components/Header";
import Product from "../components/Product";
import Footer from "../components/Footer";
import ProductInfo from "./ProductInfo";
import {useOutletContext} from "react-router-dom"


export default function Catalog() {
    const [cart, setCart] = useOutletContext();
    const [sofa, setSofa] = useState([]);
    const [chair, setChair] = useState([]);
    const [living, setLiving] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedStock, setSelectedStock] = useState("allStock");

    useEffect(() => {
        console.log(cart)
        // Fetch products and update state
        const getProducts = async () => {
            try {
                const response = await axios('/catalog/items');
                const { data: { catalog: { Sofa, Chair, Living } } } = response;
                setSofa(Sofa);
                setChair(Chair);
                setLiving(Living);
            } catch (e) {
                console.error(e);
            }
        };

        getProducts();
    }, []);

    console.log("Cart in Catalog:", cart);

    const addToCart = (id, productName, productPrice, productImg, productStock) => {
        const existingProduct = cart.find(item => item.productName === productName);

        if (existingProduct) {
            setCart(prevCart => prevCart.map(item => {
                if (item.productName === productName) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            }));
        } else {
            console.log({ id, productName , productPrice, productImg, quantity: 1 })
            setCart(prevCart => [...prevCart, { id,productName , productPrice, productImg, quantity: 1 , productStock}]);
        }
    };    

    useEffect(function(){
        localStorage.setItem("cart",JSON.stringify(cart));
    },[cart]);
    
    //Filter Buttons
    const filteredSofa = sofa.filter(
      (item) =>
        (selectedCategory === "All" || item.category_name === selectedCategory) &&
        (selectedStock === "allStock" || item.stock > 0)
    );
  
    const filteredChair = chair.filter(
      (item) =>
        (selectedCategory === "All" || item.category_name === selectedCategory) &&
        (selectedStock === "allStock" || item.stock > 0)
    );
  
    const filteredLiving = living.filter(
      (item) =>
        (selectedCategory === "All" || item.category_name === selectedCategory) &&
        (selectedStock === "allStock" || item.stock > 0)
    );
  
    const filteredProducts = filteredSofa.concat(filteredChair).concat(filteredLiving);

    <ProductInfo addToCart={addToCart}/>

    return (
        <>
            <Header cartItems={cart}/>
            <main className="shop container">
                <div className="filter">
                <div className="category-buttons">
            <button
              className="btn-buy category"
              onClick={() => setSelectedCategory("Chair")}
            >
              Chair
            </button>
            <button
              className="btn-buy category"
              onClick={() => setSelectedCategory("Sofa")}
            >
              Sofa
            </button>
            <button
              className="btn-buy category"
              onClick={() => setSelectedCategory("Living")}
            >
              Living
            </button>
            <button
              className="btn-buy category"
              onClick={() => setSelectedCategory("All")}
            >
              All
            </button>
          </div>
                    <div className="stock-buttons">
                        <button className="btn-buy stock" id="onStock">In Stock</button>
                        <button className="btn-buy stock" id="allStock">All</button>
                    </div>
                </div>
                <h2 className="section-title">Catalog</h2>

                <section className="shop-content">
                    {//sofa
                    filteredSofa
                      .map((item) => (
                        <Product
                          key={item.product_id}
                          id={item.product_id}
                          path={item.path}
                          name={item.name}
                          category={item.category_name}
                          price={item.price}
                          stock={item.stock}
                          addToCart={addToCart}
                        />
                      ))}
                    {//chair
                    filteredChair
                      .map((item) => (
                        <Product
                          key={item.product_id}
                          id={item.product_id}
                          path={item.path}
                          name={item.name}
                          category={item.category_name}
                          price={item.price}
                          stock={item.stock}
                          addToCart={addToCart}
                        />
                      ))}
                    {//living
                    filteredLiving
                      .map((item) => (
                        <Product
                          key={item.product_id}
                          id={item.product_id}
                          path={item.path}
                          name={item.name}
                          category={item.category_name}
                          price={item.price}
                          stock={item.stock}
                          addToCart={addToCart}
                        />
                      ))}
                      {/** In case you want to display only the products  without the filters, uncomment the product category and delete the filtered(Product) const
                       -Patrick
                      */}
              </section>

            </main>
            <Footer/>

        </>
    )
}