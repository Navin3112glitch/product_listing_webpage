import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
    const [searchText, setSearchText] = useState('');
    const [category, setCategory] = useState('');
    const [sort, setSort] = useState('');

    const navigate = useNavigate();

    const { totalItems } = useContext(CartContext);
    const { token, username, logout } = useContext(AuthContext);

    const handleSearch = (event) => {
        event.preventDefault();

        const params = new URLSearchParams();

        if (searchText.trim()) params.set('search', searchText.trim());
        if (category) params.set('category', category);
        if (sort) params.set('ordering', sort);

        navigate(`/?${params.toString()}`);
    };

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="logo">QuickKart</Link>

            <form className="search-container" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                />

                <select value={category} onChange={e => setCategory(e.target.value)}>
                    <option value="">All Categories</option>
                    <option value="electronics">Electronics</option>
                    <option value="jewelery">Jewellery</option>
                    <option value="men's clothing">Men's Clothing</option>
                    <option value="women's clothing">Women's Clothing</option>
                </select>

                <select value={sort} onChange={e => setSort(e.target.value)}>
                    <option value="">Default Sorting</option>
                    <option value="price">Price: Low to High</option>
                    <option value="-price">Price: High to Low</option>
                    <option value="-rating">Highest Rated</option>
                </select>

                <button type="submit">Search</button>
            </form>

            <div className="navbar-right">
                <span>Delivering to Jaipur</span>

                <Link to="/cart" className="cart-button">
                    🛒 Cart ({totalItems})
                </Link>

                {token ? (
                    <>
                        <Link to="/profile">Hi, {username}</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;