import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function ProductCard({ product }) {

    const { addToCart } = useContext(CartContext);

    return (
        <div className="product-card">

            <Link to={`/products/${product.id}`}>
                <img
                    src={product.image}
                    alt={product.title}
                    className="product-image"
                />
            </Link>

            <div className="product-info">

                <h3>{product.title}</h3>

                <p className="category">
                    {product.category}
                </p>

                <p className="price">
                    ₹{product.price}
                </p>

                <p className="rating">
                    ⭐ {product.rating} ({product.rating_count})
                </p>

                <div className="card-actions">

                    <Link to={`/products/${product.id}`}>
                        <button className="details-button">
                            View Details
                        </button>
                    </Link>

                    <button
                        className="add-cart-button"
onClick={() => {
    console.log("Add to cart clicked:", product);
    addToCart(product);
    alert("Product added to cart!");
}}                    >
                        Add to Cart
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ProductCard;