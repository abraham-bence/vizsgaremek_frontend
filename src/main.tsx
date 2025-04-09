import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/index.scss'
import ProductPage from './pages/productPage'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './core/api'
import ProfilePage from './pages/profilePage'
import HomePage from './pages/home'
import path from 'path'
import RegisterForm from './components/registerForm'
import LoginForm from './components/loginForm'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/home',
    element: <HomePage />
  },
  {
    path: '/products',
    element: <ProductPage />
  },
  {
    path: '/profile',
    element: <ProfilePage/>,
    children : [
      {
        path: 'register',
        element: <RegisterForm/>
      },
      {
        path: 'login',
        element: <LoginForm/>
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
