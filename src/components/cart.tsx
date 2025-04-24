import React, { useEffect, useState } from 'react';
import NavigationBar from './navbar';
import '../css/cart&product.scss';
import { Button, Col, Row } from 'react-bootstrap';
import ProductCard from './productCard';
import { Product } from './products';
import { MdOutlineRemoveShoppingCart } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Footer from './footer';

function Cart() {
    const [cart, setCart] = useState<Product[]>([]);
    const [likedProducts, setLikedProducts] = useState<Product[]>([]);

    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarText, setSnackbarText] = useState('');

    const navigate = useNavigate()

    // Load from localStorage when component mounts
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            const products = JSON.parse(storedCart);
            setCart(products);
        }

        const storedLikes = localStorage.getItem('likes');
        if (storedLikes) {
            const likes = JSON.parse(storedLikes);
            setLikedProducts(likes);
        }
    }, []);

    // Handle like/unlike toggle
    const handleLikeToggle = (product: Product) => {
        setLikedProducts((prev) => {
            const isLiked = prev.some((p) => p.id === product.id);
            let updatedLikes = [];

            if (isLiked) {
                updatedLikes = prev.filter((p) => p.id !== product.id);
            } else {
                updatedLikes = [...prev, product];
            }

            localStorage.setItem('likes', JSON.stringify(updatedLikes));
            return updatedLikes;
        });
    };

    // Handle product removal from cart
    const handleRemoveFromCart = (product: Product) => {
        const updatedCart = cart.filter((item) => item.id !== product.id);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // update localStorage
        setSnackbarText(`Removed "${product.name}" from cart 😞`);
        setShowSnackbar(true);
        setTimeout(() => setShowSnackbar(false), 3000); // auto-hide in 3s
    };

    const handleCheckout = () => {
        navigate('/checkout')
    };

    // Calculate the total price
    const totalPrice = cart.reduce((total, product) => total + product.price * (product.quantity || 1), 0);


    return (
        <div>
            <div className="navborder fixed">
                <NavigationBar className={`my-navbar`} />
            </div>
            <div className='myContainer'>
                {cart.length > 0 ? (
                    <div>
                        <h2>Your cart</h2>
                        <div className="checkout-section">
                            <h3>Total: ${totalPrice.toFixed(2)}</h3>
                            <Button onClick={handleCheckout} className="checkout-button">
                                Checkout
                            </Button>
                        </div>
                        <Row  xs={1} md={2} lg={3} xxl={5} className="g-4 productContainer">
                            {cart.map((product) => (
                                <Col key={product.id}>
                                    <ProductCard
                                        product={product}
                                        onRemove={handleRemoveFromCart}
                                        onLike={handleLikeToggle}
                                        isLiked={likedProducts.some((p) => p.id === product.id)}
                                        main
                                    />
                                </Col>
                            ))}
                        </Row>

                    </div>
                ) : (
                    <p className='empty-text'>
                        Your cart is empty <MdOutlineRemoveShoppingCart />
                    </p>
                )}
            </div>
            {showSnackbar && (
                <div className="snackbar">
                    {snackbarText}
                </div>
            )}
            <Footer />

        </div>
    );
}

export default Cart;
