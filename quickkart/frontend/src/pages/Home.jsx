import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [count, setCount] = useState(0);
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams();

    const searchText = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const ordering = searchParams.get('ordering') || '';
    const currentPage = searchParams.get('page') || '1';

    useEffect(() => {
        setLoading(true);
        setError('');

        axios.get('http://127.0.0.1:8000/api/products/', {
            params: {
                search: searchText,
                category: category,
                ordering: ordering,
                page: currentPage
            }
        })
            .then(response => {
                setProducts(response.data.results);
                setCount(response.data.count);
                setNextPage(response.data.next);
                setPreviousPage(response.data.previous);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setError('Unable to load products.');
                setLoading(false);
            });

    }, [searchText, category, ordering, currentPage]);

    const changePage = (url) => {
    if (!url) return;

    const pageNumber = new URL(url).searchParams.get('page') || '1';

    const params = new URLSearchParams(searchParams);

    params.set('page', pageNumber);

    setSearchParams(params);
};

    if (loading) {
        return <h2>Loading products...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    return (
        <div className="home-container">

            <h1>
                {searchText
                    ? `Search Results for "${searchText}"`
                    : 'Explore Our Products'}
            </h1>

            <p className="results-count">
                Showing {products.length} of {count} products
            </p>

            {products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <div className="product-grid">
                    {products.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            )}

            <div className="pagination">

                <button
                    onClick={() => changePage(previousPage)}
                    disabled={!previousPage}
                >
                    ← Previous
                </button>

                <span>Page {currentPage}</span>

                <button
                    onClick={() => changePage(nextPage)}
                    disabled={!nextPage}
                >
                    Next →
                </button>

            </div>

        </div>
    );
}

export default Home;