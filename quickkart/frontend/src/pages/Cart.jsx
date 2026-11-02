import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function Cart() {

    const {
        cartItems,
        updateQuantity,
        removeFromCart,
        totalPrice
    } = useContext(CartContext);

    if (cartItems.length === 0) {
        return (
            <div className="empty-cart">
                <h1>Your Cart is Empty 🛒</h1>

                <p>You haven't added any products yet.</p>

                <Link to="/" className="continue-shopping">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="cart-container">

            <h1>Shopping Cart</h1>

            <div className="cart-content">

                <div className="cart-items">

                    {cartItems.map(item => (

                        <div className="cart-item" key={item.id}>

                            <img
                                src={item.image}
                                alt={item.title}
                                className="cart-product-image"
                            />

                            <div className="cart-product-info">

                                <h3>{item.title}</h3>

                                <p className="price">
                                    ₹{item.price}
                                </p>

                                <div className="quantity-controls">

                                    <button
                                        onClick={() =>
                                            updateQuantity(item.id, -1)
                                        }
                                    >
                                        −
                                    </button>

                                    <span>{item.quantity}</span>

                                    <button
                                        onClick={() =>
                                            updateQuantity(item.id, 1)
                                        }
                                    >
                                        +
                                    </button>

                                </div>

                                <button
                                    className="remove-button"
                                    onClick={() =>
                                        removeFromCart(item.id)
                                    }
                                >
                                    Remove
                                </button>

                            </div>

                            <div className="item-subtotal">
                                ₹{(Number(item.price) * item.quantity).toFixed(2)}
                            </div>

                        </div>

                    ))}

                </div>

                <div className="cart-summary">

                    <h2>Order Summary</h2>

                    <p>
                        Products: {cartItems.length}
                    </p>

                    <h3>
                        Total: ₹{totalPrice.toFixed(2)}
                    </h3>

                    <button className="checkout-button">
                        Proceed to Checkout
                    </button>

                    <Link to="/" className="continue-link">
                        Continue Shopping
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Cart;