import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Col, Row } from 'react-bootstrap';
import ProductCard from '../components/productCard';

export interface Product {
    id: number
    name: string
    type: string
    price: number
    imgSrc: string
    manufacturer: string
}

interface Props {
    data : Product[]
}


function Products({data} : Props) {

    return (
        <>
            {/* <NavigationBar /> */}
            <Row xs={1} md={4} className="g-4 productContainer">
                {data?.map((product) => (
                    <Col key={product.id}>
                        <ProductCard product={product} />
                    </Col>

                ))}
            </Row>
        </>

    )
}

export default Products