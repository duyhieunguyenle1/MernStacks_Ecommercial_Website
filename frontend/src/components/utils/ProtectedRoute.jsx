import React from 'react'
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, isAdmin }) => {
    const { isAuthenticated, loading, user } = useSelector(state => state.auth)
    const location = useLocation()

    return (
        <>
            {loading === false && (() => {
                if (!isAuthenticated) {
                    return <Navigate to='/login' state={{ from: location }} replace />
                }
                if (isAdmin && user.role !== 'admin') {
                    return <Navigate to='/' state={{ from: location }} replace />
                }

                return children
            })()}
        </>
    )
}

export default ProtectedRoute