import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './Routes/Router.jsx'
import AuthProvider from './AuthContext/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'
import {  QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>
        <Toaster position="top-center"reverseOrder={false}/>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
