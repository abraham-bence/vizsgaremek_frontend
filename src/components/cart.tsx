import React, { useEffect, useState } from 'react'
import NavigationBar from './navbar'
import '../css/cart&product.scss'
import { Col, Row } from 'react-bootstrap';
import ProductCard from './productCard';
import { Product } from './products';
import { MdOutlineRemoveShoppingCart } from 'react-icons/md';



function Cart() {
    const [cart, setCart] = useState<Product[]>([]);

    // Load from localStorage when component mounts
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            const products = JSON.parse(storedCart)
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
                        <h2>Your cart</h2>
                        <Row xs={1} md={4} className="g-4 productContainer">
                            {cart?.map((product, i = 0) => (
                                <Col key={i++}>
                                    <ProductCard product={product} />
                                </Col>
                            ))}
                        </Row>
                    </div>
                ) : (
                    <p className='empty-text'>Your cart is empty <MdOutlineRemoveShoppingCart /></p>
                )}
            </div>


        </div>
    )
}

export default Cart