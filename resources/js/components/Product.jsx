import React from "react";

export default function Product(props) {
    const { id, path, name, price, category, stock, addToCart } = props;

    const handleAddToCart = () => {
        addToCart(id, name, price, path, stock);
        console.log('Add to cart button clicked');
    };
    
//`/product=${name}&category=${category}&price=${price}&img=${path}`

    return (
        <div className="product-box" data-category={category} data-stock={stock}>
            <a href={`/react/product/${id}`}>
                <img className="product-img" src={path} alt={name} />
            </a>
            <h2 className="product-name">{name}</h2>
            <span className="price">{`$${price}`}</span>
            <br/>
            <span className="stock">On Stock: {`${stock}`}</span>
            <i className="bx bx-cart-alt add-cart" onClick={handleAddToCart}></i>
        </div>
    );
}
