import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const useProtectedFetch = (url, initialData = null) => {
    // State management
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Navigation hook
    const navigate = useNavigate();

    // Memoized fetch function
    const fetchData = useCallback(async () => {
        // Reset state for each fetch
        setLoading(true);
        setError(null);

        try {
            // Get token from local storage
            const token = localStorage.getItem('userToken');
            
            // If no token, redirect to login
            if (!token) {
                navigate('/login');
                return;
            }

            // Make authenticated request
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                timeout: 10000 // 10 second timeout
            });

            // Update data state
            setData(response.data);
            setLoading(false);

        } catch (error) {
            // Comprehensive error handling
            if (error.response) {
                // Server responded with an error status
                if (error.response.status === 401) {
                    // Token is invalid or expired
                    localStorage.removeItem('userToken');
                    localStorage.removeItem('role');
                    navigate('/login');
                } else {
                    // Other server errors
                    setError({
                        message: error.response.data.detail || 'An error occurred',
                        status: error.response.status
                    });
                }
            } else if (error.request) {
                // Request made but no response received
                setError({
                    message: 'No response from server. Check your connection.',
                    status: 'network'
                });
            } else {
                // Error in setting up the request
                setError({
                    message: 'An unexpected error occurred',
                    status: 'unknown'
                });
            }

            // Always set loading to false
            setLoading(false);
        }
    }, [url, navigate]);

    // Trigger fetch on component mount or when URL changes
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Provide a method to manually refetch
    const refetch = () => {
        fetchData();
    };

    // Return hook values and refetch method
    return { 
        data, 
        loading, 
        error, 
        refetch 
    };
};