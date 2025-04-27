import React, { useEffect, useState } from 'react'
import NavigationBar from './navbar'
import '../css/cart&product.scss'
import { Col, Row } from 'react-bootstrap';
import ProductCard from './productCard';
import { Product } from './products';
import { MdOutlineRemoveShoppingCart } from 'react-icons/md';
import { FaHeartCrack } from 'react-icons/fa6';
import Footer from './footer';



function Favorites() {
    const [liked, setLiked] = useState<Product[]>([]);

    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarText, setSnackbarText] = useState('');

    const [cart, setCart] = useState<Product[]>([]);
    const [cartLoaded, setCartLoaded] = useState(false);


    // Load from localStorage when component mounts
    useEffect(() => {
        const storedLikes = localStorage.getItem('likes');
        if (storedLikes) {
            const products = JSON.parse(storedLikes)
            setLiked(products)
        }
    }, []);

    useEffect(() => {
        const stored = localStorage.getItem('cart');
        if (stored) setCart(JSON.parse(stored));
        setCartLoaded(true);
      }, []);
    
      // Save to localStorage
      useEffect(() => {
        if (cartLoaded) {
          localStorage.setItem('cart', JSON.stringify(cart));
        }
      }, [cart, cartLoaded]);

    const handleCartAdd = (product: Product) => {
        setCart((prev) => {
            const existingProductIndex = prev.findIndex((p) => p.id === product.id);
            if (existingProductIndex !== -1) {
                // If product is already in the cart, increment the quantity
                const updatedCart = [...prev];
                updatedCart[existingProductIndex] = {
                    ...updatedCart[existingProductIndex],
                    quantity: updatedCart[existingProductIndex].quantity + 1,
                };
                setSnackbarText(`"${product.name}" added to cart 😄`);
                setShowSnackbar(true);
                setTimeout(() => setShowSnackbar(false), 3000); // auto-hide in 3s
                return updatedCart;
            }
            setSnackbarText(`"${product.name}" added to cart 😄`);
            setShowSnackbar(true);
            setTimeout(() => setShowSnackbar(false), 3000); // auto-hide in 3s
            // If product is not in the cart, add it with quantity 1
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const handleDislike = (product: Product) => {
        setLiked((prev) => {
            const updated = prev.filter((p) => p.id !== product.id);
            localStorage.setItem('likes', JSON.stringify(updated)); // update storage

            setSnackbarText(`Removed "${product.name}" from favorites 💔`);
            setShowSnackbar(true);
            setTimeout(() => setShowSnackbar(false), 3000); // auto-hide in 3s

            return updated;
        });
    };




    return (
        <div>
            <div className="navborder fixed">
                <NavigationBar/>
            </div>
            <div className='myContainer'>
                {liked.length > 0 ? (
                    <div>
                        <h2>Your favorite products</h2>
                        <Row xs={1} md={2} lg={3} xxl={5} className="g-4 mt-2 productContainer">
                            {liked?.map((product) => (
                                <Col key={product.id}>
                                    <ProductCard product={product} main onAdd={handleCartAdd} onLike={handleDislike} isLiked />
                                </Col>
                            ))}
                        </Row>
                    </div>
                ) : (
                    <p className='empty-text'>You don't have favorite products <FaHeartCrack /></p>
                )}
            </div>
            {showSnackbar && (
                <div className="snackbar">
                    {snackbarText}
                </div>
            )}
            <Footer />

        </div>
    )
}

export default Favorites