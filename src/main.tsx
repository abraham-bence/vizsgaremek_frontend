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
import RegisterForm from './components/forms/registerForm'
import LoginForm from './components/forms/loginForm'
import EditForm from './components/forms/editForm'
import Profile from './components/profile'
import ChangePasswordForm from './components/forms/changePasswordForm'
import DeleteForm from './components/forms/deleteForm'
import Cart from './components/cart'
import Favorites from './components/favorites'
import ProductDetails from './components/productDetails'
import Checkout from './pages/checkoutPage'
import ThankYou from './pages/thankyouPage'

const router = createBrowserRouter([
  {
    path: '',
    element: <HomePage />
  },
  {
    path: 'home',
    element: <HomePage />
  },
  {
    path: 'products',
    element: <ProductPage />,
  },
  {
    path : 'products/:id',
    element: <ProductDetails/>
  },
  {
    path: 'cart',
    element: <Cart/>
  },
  {
    path: 'favorites',
    element: <Favorites/>
  },
  {
    path: 'profile',
    element: <ProfilePage/>,
    children : [
      {
        path: 'register',
        element: <RegisterForm/>
      },
      {
        path: 'login',
        element: <LoginForm/>
      },
      {
        path: 'edit',
        element: <EditForm/>
      },
      {
        path: 'myProfile',
        element: <Profile/>
      },
      {
        path: 'changePassword',
        element: <ChangePasswordForm/>
      }, 
      {
        path: 'delete',
        element : <DeleteForm/>
      }
    ]
  },
  {
    path: 'checkout',
    element: <Checkout/>
  },
  {
    path: 'thank-you',
    element: <ThankYou/>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
