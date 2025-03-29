import React, { useEffect, useMemo, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NavigationBar from '../components/navbar';
import Products, { Product } from '../components/products';
import Filter from '../components/filter';
import '../css/productPage.scss';
import { useProducts } from '../core/hooks';

function ProductPage() {
    const [selectedType, setSelectedTypes] = useState<string>('ALL');
    const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([]);
    const [filteredData, setFilteredData] = useState<Product[]>([]);


    const getProducts = useProducts()
    const products = useMemo(() => getProducts.data ?? [], [getProducts.data]);

    // Toggle type selection
    const toggleType = (type: string) => {
        setSelectedTypes((prev) => {
            if(prev == type) {
                setSelectedManufacturers([])
                return 'ALL'
            }
            else {
                setSelectedManufacturers([])
                return type
            }
        }
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

        if (selectedType != 'ALL') {
            filtered = filtered.filter((product) => selectedType == product.type);
        }

        if (selectedManufacturers.length > 0) {
            filtered = filtered.filter((product) => selectedManufacturers.includes(product.manufacturer));
        }

        setFilteredData(filtered);
    }, [selectedType, selectedManufacturers, products]);

    return (
        <div>
            <NavigationBar className='my-navbar-secondary' />
            <Container className='mt-5'>
                <Row>
                    <Col sm={2}>
                        <Filter
                            selectedType={selectedType}
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
