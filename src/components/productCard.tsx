import React from 'react'
import { Product } from '../components/products'
import { Card } from 'react-bootstrap'

interface Props {
    product: Product
}

function ProductCard({ product }: Props) {
    return (
        <Card>
            <Card.Img variant="top" src={'http://localhost:3000/uploads/' + product.imgSrc}/>
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