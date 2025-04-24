import React, { use, useEffect, useState } from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import ProductCard from './productCard'
import { Product } from './products'
import { apiClient } from '../core/api'
import { useParams } from 'react-router-dom'
import '../css/orderDetails.scss'

interface Order {
    id: number
    email: string
    address: string
    products: Product[]
    totalPrice: number
    status: string
}

function OrderDetails() {
    const { id } = useParams();
    const [order, setOrder] = useState<Order>()
    const [cart, setCart] = useState<Product[]>([])
    const [error, setError] = useState("")

    useEffect(() => {
        apiClient.get('/order/' + id, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            .then((res) => {
                setCart(res.data.products)
                setOrder(res.data)
            })
            .catch((err) => {
                console.log(err)
                setError('No orders found')
            })
    }, [])

    const handleDelete = () => {
        apiClient.delete('/order/' + id, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            .then(() => {
                setCart([])
                setOrder(undefined)
                setError('Order deleted successfully')
            })
            .catch((err) => {
                console.log(err)
                setError('Failed to delete order')
            })
    }

    return (
        <div className='myContainer'>
            {cart.length > 0 ? (
                <div>
                    <h2>Your order</h2>

                    <div className='details-container mb-3'>
                        <div>
                            <p>Email: {order?.email} </p>
                            <p>Address: {order?.address} </p>
                        </div>
                        <div>
                            <p>Total price: {order?.totalPrice} </p>
                            <p>Status: {order?.status} </p>
                        </div>
                    </div>
                    <Row xs={1} md={2} lg={3} xxl={5} className="g-4 productContainer">
                        {cart.map((product) => (
                            <Col key={product.id}>
                                <ProductCard
                                    product={product}
                                />
                            </Col>
                        ))}
                    </Row>
                    <Row >
                        <Col className="btnConatiner">
                            <Button className='deleteBtn' onClick={handleDelete}>
                                Delete
                            </Button>
                        </Col>
                    </Row>

                </div>
            ) : (
                <p className='empty-text'>
                    {error}
                </p>
            )}
        </div>
    )
}

export default OrderDetails