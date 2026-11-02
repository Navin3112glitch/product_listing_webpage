import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {

    const [cartItems, setCartItems] = useState([]);

    // Add product to cart
    const addToCart = (product) => {
        setCartItems((previousItems) => {

            const existingItem = previousItems.find(
                item => item.id === product.id
            );

            if (existingItem) {
                return previousItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [
                ...previousItems,
                { ...product, quantity: 1 }
            ];
        });
    };

    // Increase or decrease quantity
    const updateQuantity = (productId, change) => {
        setCartItems(previousItems =>
            previousItems
                .map(item =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity + change }
                        : item
                )
                .filter(item => item.quantity > 0)
        );
    };

    // Remove product
    const removeFromCart = (productId) => {
        setCartItems(previousItems =>
            previousItems.filter(item => item.id !== productId)
        );
    };

    // Calculate total price
    const totalPrice = cartItems.reduce(
        (total, item) =>
            total + Number(item.price) * item.quantity,
        0
    );

    // Calculate total items
    const totalItems = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                updateQuantity,
                removeFromCart,
                totalPrice,
                totalItems
            }}
        >
            {children}
        </CartContext.Provider>
    );
}