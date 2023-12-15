import React, { useEffect, useState } from "react";
import {useOutletContext, useNavigate} from "react-router-dom";

//const [cart, setCart] = useOutletContext();


export default function Cart({ cartVisible, closeCart }) {
    const [cartItems, setCartItems, user] = useOutletContext();
    const [totalAmount, setTotalAmount] = useState(0);  
    const navigate = useNavigate();

    async function purchase(){
        console.log(user)
        if(!user?.id) {
            console.log("Not user")
            return;
        }
        try{
            const response = await axios.post("/purchase",{products:cartItems, user_id:user.id})
            const {data} = response
            setCartItems([])
        }catch(e){
            console.log(e)
        }
    }

    //Check if the user is logged in
    async function checkUser() {
        try {
            const response = await axios.get('/check');
            const { is_user_auth } = response.data;
                if (is_user_auth) {
                        console.log("User is logged in");
                        purchase();
                    }
                    else {
                        navigate('/login');
                    }
        
                } catch (error) {
                    console.error('Logout error:', error);
                }
        }



        //remove from cart
    const removeFromCart = (productName) => {
        const index = cartItems.findIndex(item => item.productName === productName);

        if (index !== -1) {
            const updatedCart = [...cartItems.slice(0, index), ...cartItems.slice(index + 1)];
            setCartItems(updatedCart);
        }

        updateTotalAmount();
    };

    const updateTotalAmount = () => {
        setTotalAmount(cartItems.reduce((acc, product) => acc + product.productPrice*product.quantity,0));
    };

    const handleQuantityChange = (productName, newQuantity) => {
        const index = cartItems.findIndex(item => item.productName === productName);

        if (index !== -1) {
            // Update the quantity of the item
            const updatedCart = [...cartItems];
            updatedCart[index].quantity = newQuantity;
            setCartItems(updatedCart);
        }

        // Update the total amount
        updateTotalAmount();
    };
    useEffect(function(){
        console.log(cartItems)
        updateTotalAmount();
        localStorage.setItem("cart",JSON.stringify(cartItems));
    },[cartItems])
    return (
        <section className={`cart ${cartVisible ? 'active' : ''}`}>
            <h2 className="cart-title">Your Products</h2>
            <div className="cart-content">
                {cartItems.map((item) => (

                    <div key={item.productName} className="cart-box">
                    <img src={item.productImg} alt="" className="cart-img"/>
                    <div className="detail-box">
                <h3 className="cart-product-title">{item.productName}</h3>
                <span className="cart-price">${item.productPrice}</span>
                <input type="number" className="cart-quantity" min={0} name="cart-quantity" onChange={e => handleQuantityChange(item.productName, parseInt(e.target.value))} id="" defaultValue={item.quantity}/>
            </div>
            <i class="bx bx-trash cart-remove" onClick={() => removeFromCart(item.productName)}></i>
        </div>
                    /*
                    <div key={item.productName} className="cart-box">
                        <span onClick={() => removeFromCart(item.productName)}>Remove</span>
                        <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.productName, parseInt(e.target.value))}
                        />
                    </div>
                    */
                ))}
            </div>
            <div className="total">
                <h4 className="total-title">Total</h4>
                <span className="total-price">${totalAmount}</span>
            </div>
            <button type="button" id="addCart-btn" className={`btn-buy ${!cartItems?.length? "pay":"pay active"}`} onClick={checkUser}>Buy Now</button>
            <button type="button" className="btn-buy browse">Continue Browsing</button>
            <i className='bx bx-x' id="close-cart" onClick={closeCart}></i>
        </section>
    );
}