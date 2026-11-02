import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function ProductDetails() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/products/${id}/`)
            .then(response => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setError('Unable to load product details.');
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <h2>Loading product details...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    if (!product) {
        return <h2>Product not found.</h2>;
    }

    return (
        <div className="product-details-container">

            <Link to="/" className="back-button">
                ← Back to Products
            </Link>

            <div className="product-details">

                <div className="details-image-container">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="details-image"
                    />
                </div>

                <div className="details-info">

                    <p className="category">
                        {product.category}
                    </p>

                    <h1>{product.title}</h1>

                    <h2 className="price">
                        ₹{product.price}
                    </h2>

                    <p className="rating">
                        ⭐ {product.rating} ({product.rating_count} reviews)
                    </p>

                    <h3>Description</h3>

                    <p className="description">
                        {product.description}
                    </p>

                </div>

            </div>
        </div>
    );
}

export default ProductDetails;