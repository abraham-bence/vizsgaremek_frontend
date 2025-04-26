import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Product } from '../components/products';
import NavigationBar from '../components/navbar';
import '../css/cart&product.scss';
import { apiClient } from '../core/api';

interface Errors {
  email?: string;
  address?: string;
}

function Checkout() {
  const [cart, setCart] = useState<Product[]>([]);
  const [userDetails, setUserDetails] = useState({
    email: '',
    address: '',
    paymentMethod: 'credit-card',
  });

  const [errors, setErrors] = useState<Errors>()

  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if (localStorage.getItem("token")) {
      apiClient.get('/auth/profile', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
        .then((res) => {
          setUserDetails(res.data)
        })
        .catch((err) => {
          console.log('igen')
          console.log(err)
        })
    }
  })

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const products = JSON.parse(storedCart);
      setCart(products);
    }
  }, []);

  // Handle user input for checkout form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setErrors((prev) => ({
      ...prev,
      [name]: null
    }))
    setUserDetails({ ...userDetails, [name]: value });

  };

  // Calculate the total price
  const totalPrice = cart.reduce(
    (total, product) => total + product.price * (product.quantity || 1),
    0
  );

  // Simulate checkout process
  const handleCheckout = () => {

    setIsProcessing(true);

    const products = cart.map((item) => {
      return {
        productId: item.id,
        quantity: item.quantity
      }
    })

    apiClient.post('/order', {
      email: userDetails.email,
      address: userDetails.address,
      products: products
    })
      .then((res) => {
        console.log(res)
        localStorage.setItem('cart', JSON.stringify([])); // Clear the cart after checkout
        setCart([]); // Clear cart state
        setIsProcessing(false);
        navigate('/thank-you'); // Redirect to a thank-you page or home
      })
      .catch((err) => {
        console.log(err.response.data.errors)
        setIsProcessing(false);
        setErrors(err.response.data.errors)
      })
  };

  return (
    <div>
      <NavigationBar/>
      <div className='formContainer'>
        {cart.length > 0 ? (
          <div className='myForm' >
            <h2>Checkout</h2>
            <Form >
              <Form.Group controlId="formName">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={userDetails.email}
                  onChange={handleInputChange}
                  className={errors?.email ? "is-invalid" : ""}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your address"
                  name="address"
                  value={userDetails.address}
                  onChange={handleInputChange}
                  className={errors?.address ? "is-invalid" : ""}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.address}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formPaymentMethod">
                <Form.Label>Payment Method</Form.Label>
                <Form.Control
                  as="select"
                  name="paymentMethod"
                  value={userDetails.paymentMethod}
                  onChange={handleInputChange}
                >
                  <option value="credit-card">Credit Card</option>
                  <option value="paypal">PayPal</option>
                </Form.Control>
              </Form.Group>
            </Form>
            <h4>Total: ${totalPrice.toFixed(2)}</h4>

            <Button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="checkoutBtn"
            >
              {isProcessing ? 'Processing...' : 'Complete Checkout'}
            </Button>



          </div>
        ) : (
          <p>Your cart is empty. Add products to your cart before checkout.</p>
        )}
      </div>
    </div>
  );
}

export default Checkout;
