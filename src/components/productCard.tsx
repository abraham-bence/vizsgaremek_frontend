import React from 'react'
import { Product } from '../pages/products'
import { Card } from 'react-bootstrap'

interface Props {
    product: Product
}

function ProductCard({ product }: Props) {
    return (
        <Card>
            <Card.Img variant="top" src={product.imgSrc}/>
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                    {product.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ProductCard