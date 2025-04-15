import { useCallback, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NavigationBar from '../components/navbar';
import Products from '../components/products';
import Filter from '../components/filter';
import '../css/productPage.scss';
import { useSearchParams } from 'react-router-dom';
import Footer from '../components/footer';
import _ from 'lodash';

function ProductPage() {
    const [selectedType, setSelectedTypes] = useState<string>('ALL');
    const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([]);
    const [search, setSearch] = useSearchParams();

    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);



    // Sync state when searchParams change
    useEffect(() => {
        const query = search.get('query');
        if (!query) {
            setSelectedTypes('ALL'); // Reset type when query is empty
        }
    }, [search]);

    const buildQueryString = (type: string, manufacturers: string[]) => {
        let parts = [];
        if (type !== 'ALL') parts.push(type);
        parts = [...manufacturers, ...parts];
        return parts.join(' ');
    };


    // Toggle type selection
    const toggleType = (type: string) => {
        setSelectedTypes((prev) => {
            const newType = prev === type ? 'ALL' : type;
            const newQuery = buildQueryString(newType, selectedManufacturers);
            if (newQuery) {
                search.set('query', newQuery);
            } else {
                search.delete('query');
            }
            setSearch(search, { replace: true });
            return newType;
        });
    };


    // Toggle manufacturer selection
    const toggleManufacturer = (manufacturer: string) => {
        setSelectedManufacturers((prev) => {
            const newList = prev.includes(manufacturer)
                ? prev.filter((m) => m !== manufacturer)
                : [...prev, manufacturer];

            const newQuery = buildQueryString(selectedType, newList);
            if (newQuery) {
                search.set('query', newQuery);
            } else {
                search.delete('query');
            }
            setSearch(search, { replace: true });

            return newList;
        });
    };

    // Debounced handler for search URL update
    const debouncedSetSearch = useCallback(
        _.debounce((query: string) => {
            if (query) {
                search.set('query', query);
            } else {
                search.delete('query');
            }
            setSearch(search, { replace: true });
        }, 500), // Debounce delay
        [search, setSearch]
    );

    const handlePriceFilter = (newRange: [number, number]) => {
        setPriceRange(newRange);

        const [min, max] = newRange;
        let priceQuery = '';

        if (min > 0 && max < 1000) {
            priceQuery = `${min}-${max}`;
        } else if (min > 0) {
            priceQuery = `>${min}`;
        } else if (max < 1000) {
            priceQuery = `<${max}`;
        }

        const typePart = selectedType !== 'ALL' ? selectedType : '';
        const allParts = [...selectedManufacturers, typePart, priceQuery].filter(Boolean);
        const newQuery = allParts.join(' ');

        // Immediately apply the price filter to the URL but debounce the update
        debouncedSetSearch(newQuery);
    };

    // Reset filters function
    const resetFilters = () => {
        setPriceRange([0, 1000]);
        search.delete('query');
        setSelectedManufacturers([])
        setSelectedTypes("")
        setSearch(search, { replace: true });
    };


    return (
        <div>
            <div className="navborder fixed">
                <NavigationBar className='my-navbar' resetFilters={resetFilters} />
            </div>
            <Container className='mt-5'>
                <Row>
                    <Col sm={2} className='mr-2'>
                        <Filter
                            selectedType={selectedType}
                            selectedManufacturers={selectedManufacturers}
                            toggleType={toggleType}
                            toggleManufacturer={toggleManufacturer}
                            searchParams={search}
                            setSearch={setSearch}
                            priceRange={priceRange}
                            handlePriceFilter={handlePriceFilter}
                            resetFilters={resetFilters} />
                    </Col>
                    <Col sm={10} className='productCell'>
                        <Products />
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
}

export default ProductPage;
