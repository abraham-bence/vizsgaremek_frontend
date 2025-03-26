import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NavigationBar from '../components/navbar';
import Products, { Product } from '../components/products';
import Filter from '../components/filter';
import '../css/productPage.scss';
import axios from 'axios';

function ProductPage() {
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([]);
    const [filteredData, setFilteredData] = useState<Product[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        axios.get("http://localhost:3000/product")
            .then((response) => {
                setProducts(response.data);
                setFilteredData(response.data);
            });
    }, []);

    // Toggle type selection
    const toggleType = (type: string) => {
        setSelectedTypes((prev) =>
            prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
        );
    };

    // Toggle manufacturer selection
    const toggleManufacturer = (manufacturer: string) => {
        setSelectedManufacturers((prev) =>
            prev.includes(manufacturer) ? prev.filter((m) => m !== manufacturer) : [...prev, manufacturer]
        );
    };

    // Filter products based on selected types & manufacturers
    useEffect(() => {
        let filtered = products;

        if (selectedTypes.length > 0) {
            filtered = filtered.filter((product) => selectedTypes.includes(product.type));
        }

        if (selectedManufacturers.length > 0) {
            filtered = filtered.filter((product) => selectedManufacturers.includes(product.manufacturer));
        }

        setFilteredData(filtered);
    }, [selectedTypes, selectedManufacturers, products]);

    return (
        <div>
            <NavigationBar className='my-navbar-secondary' />
            <Container className='mt-5'>
                <Row>
                    <Col sm={2}>
                        <Filter 
                            selectedTypes={selectedTypes} 
                            selectedManufacturers={selectedManufacturers} 
                            toggleType={toggleType} 
                            toggleManufacturer={toggleManufacturer} 
                        />
                    </Col>
                    <Col sm={10}>
                        <Products data={filteredData} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ProductPage;
