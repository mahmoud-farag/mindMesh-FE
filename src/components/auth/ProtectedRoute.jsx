import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import { useAuth } from '../../context/authContext';

export default function ProtectedRoute() {
  //* States

  //* Custom hooks
  const { isAuthenticated, isLoading } = useAuth();

  //* Refs

  //* Helper functions

  //* Life cycle hooks

  //* Handlers

  //* JSX

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ?
    (
      <AppLayout>
        <Outlet></Outlet>
      </AppLayout>
    )
    : (

      <Navigate to='/login' replace />
    )



}
