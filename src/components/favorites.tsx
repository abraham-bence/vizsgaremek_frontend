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
    const [cart, setCart] = useState<Product[]>([]);

    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarText, setSnackbarText] = useState('');


    // Load from localStorage when component mounts
    useEffect(() => {
        const storedLikes = localStorage.getItem('likes');
        if (storedLikes) {
            const products = JSON.parse(storedLikes)
            setCart(products)
        }
    }, []);

    const handleDislike = (product: Product) => {
        setCart((prev) => {
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
                <NavigationBar className={`my-navbar `} />
            </div>
            <div className='myContainer'>
                {cart.length > 0 ? (
                    <div>
                        <h2>Your favorite products</h2>
                        <Row xs={1} md={2} lg={3} xxl={5} className="g-4 mt-2 productContainer">
                            {cart?.map((product) => (
                                <Col key={product.id}>
                                    <ProductCard product={product} main onLike={handleDislike} isLiked />
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