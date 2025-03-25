import React, { useEffect, useState } from 'react'
import NavigationBar from '../components/navbar'
import axios from "axios";
import { Col, Row } from 'react-bootstrap';
import ProductCard from '../components/productCard';

export interface Product {
    id: number
    name: string
    type: string
    price: number
    imgSrc : string
}


function Products() {
    const [products, setProducts] = useState<Product[]>([])



    useEffect(() => {
        axios.get("http://localhost:3000/product")
            .then((response) => {
                setProducts(response.data)
            })
    })

    return (
        <>
            {/* <NavigationBar /> */}
            <Row xs={1} md={4} className="g-4 productContainer">
                {products?.map((product) => (
                    <Col key={product.id}>
                        <ProductCard product={product}/>
                    </Col>

                ))}
            </Row>
        </>

    )
}

export default Products