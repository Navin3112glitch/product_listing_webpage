import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Profile() {
    const { token, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(
            'http://127.0.0.1:8000/api/auth/profile/',
            {
                headers: {
                    Authorization: `Token ${token}`
                }
            }
        )
        .then(response => setUser(response.data))
        .catch(() => setError('Unable to access profile.'));
    }, [token]);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div className="auth-container">
            <h1>My Profile</h1>

            {user && (
                <>
                    <h3>Welcome, {user.username}!</h3>
                    <p>Email: {user.email}</p>
                    <p>{user.message}</p>
                </>
            )}

            {error && <p className="error-message">{error}</p>}

            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Profile;