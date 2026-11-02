import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(
        localStorage.getItem('token')
    );

    const [username, setUsername] = useState(
        localStorage.getItem('username')
    );

    const login = async (username, password) => {
        const response = await axios.post(
            'http://127.0.0.1:8000/api/auth/login/',
            { username, password }
        );

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);

        setToken(response.data.token);
        setUsername(response.data.username);

        return response.data;
    };

    const logout = async () => {
        try {
            if (token) {
                await axios.post(
                    'http://127.0.0.1:8000/api/auth/logout/',
                    {},
                    {
                        headers: {
                            Authorization: `Token ${token}`
                        }
                    }
                );
            }
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            setToken(null);
            setUsername(null);
        }
    };

    return (
        <AuthContext.Provider
            value={{ token, username, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}