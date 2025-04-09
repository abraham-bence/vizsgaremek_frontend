import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NavigationBar from '../components/navbar';
import Products from '../components/products';
import Filter from '../components/filter';
import '../css/productPage.scss';
import { useSearchParams } from 'react-router-dom';

function ProductPage() {
    const [selectedType, setSelectedTypes] = useState<string>('ALL');
    const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([]);
    const [search, setSearch] = useSearchParams();

    // Sync state when searchParams change
    useEffect(() => {
        const query = search.get('query');
        if (!query) {
            setSelectedTypes('ALL'); // Reset type when query is empty
        }
    }, [search]);

    // Toggle type selection
    const toggleType = (type: string) => {
        setSelectedTypes((prev) => {
            const newSearch = new URLSearchParams(search);

            if (prev === type) {
                setSelectedManufacturers([]);
                newSearch.delete('query'); // Correct way to remove query
                setSearch(newSearch, { replace: true });
                return 'ALL';
            } else {
                newSearch.set('query', type);
                setSearch(newSearch, { replace: true });
                setSelectedManufacturers([]);
                return type;
            }
        });
    };

    // Toggle manufacturer selection
    const toggleManufacturer = (manufacturer: string) => {
        setSelectedManufacturers((prev) =>
            prev.includes(manufacturer) ? prev.filter((m) => m !== manufacturer) : [...prev, manufacturer]
        );
    };

    return (
        <div>
            <div className="navborder fixed">
            <NavigationBar className='my-navbar'/>
            </div>
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
                        <Products />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ProductPage;
