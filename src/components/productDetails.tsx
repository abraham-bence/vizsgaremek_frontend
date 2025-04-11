import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Product } from './products';
import { apiClient } from '../core/api';
import { BarLoader } from 'react-spinners';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import '../css/productDetails.scss';
import NavigationBar from './navbar';

function ProductDetails() {
    const { id } = useParams(); // Extract the product ID from the URL
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        // Fetch the product details based on the `id`
        apiClient.get(`products/${id}`)
            .then((res) => {
                setProduct(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    if (!product)
        return (
            <div className="loading-container">
                <BarLoader height={8} width="100%" color="#4a91e248" />
            </div>
        );

    return (
        <div>
            <div className="navborder fixed">
                <NavigationBar className={`my-navbar `} />
            </div>
            <Container className="product-details-container">
                <Row className="product-details">
                    <Col>
                        <Card.Img
                            variant="top"
                            src={`http://localhost:3000/uploads/${product.imgSrc}`}
                            alt={product.name}
                        />
                    </Col>
                    <Col >
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{product.manufacturer}</Card.Subtitle>
                        <Card.Text className="product-price">
                            <strong>{product.price} USD</strong>
                        </Card.Text>
                        <Card.Text>{product.manufacturer}</Card.Text>
                        <div className="action-buttons">
                            <Button variant="primary" size="lg">
                                Add to Cart
                            </Button>
                            <Button variant="outline-danger" size="lg">
                                Add to Wishlist
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col >
                        details
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ProductDetails;
