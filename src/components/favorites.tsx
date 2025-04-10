import React, { useEffect, useState } from 'react'
import NavigationBar from './navbar'
import '../css/cart&product.scss'
import { Col, Row } from 'react-bootstrap';
import ProductCard from './productCard';
import { Product } from './products';
import { MdOutlineRemoveShoppingCart } from 'react-icons/md';
import { FaHeartCrack } from 'react-icons/fa6';



function Favorites() {
    const [cart, setCart] = useState<Product[]>([]);

    // Load from localStorage when component mounts
    useEffect(() => {
        const storedLikes = localStorage.getItem('likes');
        if (storedLikes) {
            const products = JSON.parse(storedLikes)
            setCart(products)
        }
    }, []);



    return (
        <div>
            <div className="navborder fixed">
                <NavigationBar className={`my-navbar `} />
            </div>
            <div className='myContainer'>
                {cart.length > 0 ? (
                    <div>
                        <h2>Your favorite products</h2>
                        <Row xs={1} md={4} className="g-4 productContainer">
                            {cart?.map((product, i = 0) => (
                                <Col key={i++}>
                                    <ProductCard product={product} />
                                </Col>
                            ))}
                        </Row>
                    </div>
                ) : (
                    <p className='empty-text'>You don't have favorite products <FaHeartCrack /></p>
                )}
            </div>


        </div>
    )
}

export default Favorites