import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
            await axios.post(
                'http://127.0.0.1:8000/api/auth/register/',
                form
            );

            setMessage('Registration successful! Please login.');

            setTimeout(() => navigate('/login'), 1000);

        } catch (err) {
            setError(
                JSON.stringify(err.response?.data || 'Registration failed')
            );
        }
    };

    return (
        <div className="auth-container">
            <h1>Create Account</h1>

            <form onSubmit={handleSubmit}>
                <input
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    required
                />

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password (minimum 6 characters)"
                    value={form.password}
                    onChange={handleChange}
                    minLength="6"
                    required
                />

                <button type="submit">Register</button>
            </form>

            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}

            <p>Already registered? <Link to="/login">Login</Link></p>
        </div>
    );
}

export default Register;