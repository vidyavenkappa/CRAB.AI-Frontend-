import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
    const isLoggedIn = localStorage.getItem('userToken') !== null;
    const userRole = localStorage.getItem('role');

    if (!isLoggedIn) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" replace />;
    }

    // Check if user's role is in the allowed roles
    if (!allowedRoles.includes(userRole)) {
        // Redirect to appropriate dashboard based on role
        return userRole === 'student'
            ? <Navigate to="/student-dashboard" replace />
            : <Navigate to="/login" replace />;
    }

    // Allow access to the route
    return <Outlet />;
};

export default ProtectedRoute;