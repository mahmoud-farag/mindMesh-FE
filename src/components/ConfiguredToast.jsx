import React from 'react';
import { Toaster } from 'react-hot-toast';

export default function ConfiguredToast() {
  //* States

  //* Custom hooks

  //* Refs

  //* Helper functions

  //* Life cycle hooks

  //* Handlers

  //* JSX

  return (

    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,

        success: {
          style: {
            background: '#DCFCE7',     // green-100
            color: '#166534',          // green-800
            border: '1px solid #22C55E',
          },
          iconTheme: {
            primary: '#22C55E',
            secondary: '#ECFDF5',
          },
        },

        error: {
          style: {
            background: '#991B1B',     // red-100
            color: '#ffff',          // red-800
            border: '1px solid #EF4444',
          },
          iconTheme: {
            primary: '#EF4444',
            secondary: '#FEF2F2',
          },
        },
      }}
    />
  )
}
