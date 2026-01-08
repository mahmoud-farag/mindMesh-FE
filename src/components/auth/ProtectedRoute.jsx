import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import { useAuth } from '../../context/authContext';

export default function ProtectedRoute() {


  const { isAuthenticated, isLoading } = useAuth();


  if (isLoading) {
    return <div>Loading...</div>
  }

  return isAuthenticated?   
    (
      <AppLayout>
        <Outlet></Outlet>
      </AppLayout>
    )
  : (

  <Navigate to='/login' replace />
  )
      
  
    
}
