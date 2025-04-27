import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { apiClient } from '../core/api';
import { BarLoader } from 'react-spinners';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import '../css/productDetails.scss';
import NavigationBar from './navbar';
import { Product } from '../core/interfaces';
import Footer from './footer';

function ProductDetails() {
    const { id } = useParams(); // Extract the product ID from the URL
    const [product, setProduct] = useState<Product | null>(null);
    const [cart, setCart] = useState<Product[]>([]);
    const [favorites, setFavorites] = useState<Product[]>([]);

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

    // Load cart and favorites from localStorage
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }

        const storedFavorites = localStorage.getItem('likes');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    // Save cart to localStorage
    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart]);

    // Save favorites to localStorage
    useEffect(() => {
        if (favorites.length > 0) {
            localStorage.setItem('likes', JSON.stringify(favorites));
        }
    }, [favorites]);

    const handleAddToCart = () => {
        if (product) {
            const updatedCart = [...cart, product];
            setCart(updatedCart);
        }
    };

    const handleAddToFavorites = () => {
        if (product) {
            const updatedFavorites = [...favorites, product];
            setFavorites(updatedFavorites);
        }
    };

    if (!product)
        return (
            <div className="loading-container">
                <BarLoader height={8} width="100%" color="#4a91e248" />
            </div>
        );

    return (
        <div className='body'>
            <div className="navborder fixed">
                <NavigationBar/>
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
                            <Button variant="primary" size="lg" onClick={handleAddToCart}>
                                Add to Cart
                            </Button>
                            <Button variant="outline-danger" size="lg" onClick={handleAddToFavorites}>
                                Add to Favorites
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col >
                        {product.Processor && (
                            <>
                                <h3>{product.name}</h3>
                                <p><strong>Model:</strong> {product.Processor.processorModel}</p>
                                <p><strong>Architecture:</strong> {product.Processor.architecture}</p>
                                <p><strong>Base Frequency:</strong> {product.Processor.baseFrequency} GHz</p>
                                <p><strong>Turbo Boost:</strong> {product.Processor.turboBoostFrequency} GHz</p>
                                <p><strong>Cache:</strong> {product.Processor.cache} MB</p>
                                <p><strong>Integrated Graphics:</strong> {product.Processor.integratedGraphicModel}</p>
                                <p><strong>Technology:</strong> {product.Processor.processorTechnology}</p>
                            </>
                        )}

                        {product.Memory && (
                            <>
                                <h3>{product.name}</h3>
                                <p><strong>Capacity:</strong> {product.Memory.memoryCapacity} GB</p>
                                <p><strong>Type:</strong> {product.Memory.memoryType}</p>
                                <p><strong>Installed:</strong> {product.Memory.installedMemory} GB</p>
                                <p><strong>Frequency:</strong> {product.Memory.frequency} MHz</p>
                                <p><strong>Supported:</strong> {product.Memory.supportedMemoryCapacity} GB</p>
                            </>
                        )}

                        {product.HardDrive && (
                            <>
                                <h3>{product.name}</h3>
                                <p><strong>Capacity:</strong> {product.HardDrive.capacity} GB</p>
                                <p><strong>Type:</strong> {product.HardDrive.storageType}</p>
                                <p><strong>Interface:</strong> {product.HardDrive.connectionInterface}</p>
                                <p><strong>Read Speed:</strong> {product.HardDrive.readingSpeed} MB/s</p>
                                <p><strong>Write Speed:</strong> {product.HardDrive.writingSpeed} MB/s</p>
                                <p><strong>NAND Type:</strong> {product.HardDrive.nandFlashType}</p>
                                <p><strong>PCI Gen:</strong> {product.HardDrive.pciGeneration}</p>
                            </>
                        )}

                        {product.VideoCard && (
                            <>
                                <h3>{product.name}</h3>
                                <p><strong>Chipset:</strong> {product.VideoCard.videoChipset}</p>
                                <p><strong>Producer:</strong> {product.VideoCard.producer}</p>
                                <p><strong>Socket:</strong> {product.VideoCard.cpuSocket}</p>
                                <p><strong>Cooling:</strong> {product.VideoCard.coolingType}</p>
                                <p><strong>Core Speed:</strong> {product.VideoCard.graphicChipSpeed} MHz</p>
                                <p><strong>Memory Speed:</strong> {product.VideoCard.graphicMemorySpeed} MHz</p>
                                <p><strong>Memory:</strong> {product.VideoCard.memoryCapacity} GB</p>
                                <p><strong>Bandwidth:</strong> {product.VideoCard.bandwidth} GB/s</p>
                                <p><strong>Power Req:</strong> {product.VideoCard.suggestedPower}W</p>
                                <p><strong>Display Ports:</strong> {product.VideoCard.displayPort}</p>
                                <p><strong>Size:</strong> {product.VideoCard.size}</p>
                            </>
                        )}

                        {product.Motherboard && (
                            <>
                                <h3>{product.name}</h3>
                                <p><strong>Socket:</strong> {product.Motherboard.cpuSocket}</p>
                                <p><strong>Chipset:</strong> {product.Motherboard.chipset}</p>
                                <p><strong>Memory Type:</strong> {product.Motherboard.memoryType}</p>
                                <p><strong>CPU Brand:</strong> {product.Motherboard.processorSeller}</p>
                                <p><strong>GPU Support:</strong> {product.Motherboard.graphicCard}</p>
                                <p><strong>HDMI:</strong> {product.Motherboard.hdmi ? 'Yes' : 'No'}</p>
                                <p><strong>SATA Ports:</strong> {product.Motherboard.sataConnectors}</p>
                                <p><strong>PCI Slots:</strong> {product.Motherboard.pciConnectors}</p>
                                <p><strong>USB Ports:</strong> {product.Motherboard.usbPorts}</p>
                                <p><strong>Memory Slots:</strong> {product.Motherboard.memorySockets}</p>
                                <p><strong>Sound:</strong> {product.Motherboard.integratedSound ? 'Yes' : 'No'}</p>
                                <p><strong>Bluetooth:</strong> {product.Motherboard.bluetooth ? 'Yes' : 'No'}</p>
                                <p><strong>WiFi:</strong> {product.Motherboard.wireless ? 'Yes' : 'No'}</p>
                                <p><strong>Form Factor:</strong> {product.Motherboard.sizeStandard}</p>
                            </>
                        )}

                        {product.CPUCooler && (
                            <>
                                <h3>{product.name}</h3>
                                <p><strong>Speed:</strong> {product.CPUCooler.fanSpeed} RPM</p>
                                <p><strong>Type:</strong> {product.CPUCooler.type}</p>
                                <p><strong>Airflow:</strong> {product.CPUCooler.airflow} CFM</p>
                                <p><strong>Frequency:</strong> {product.CPUCooler.frequency} MHz</p>
                            </>
                        )}

                        {product.PowerSupply && (
                            <>
                                <h3>{product.name}</h3>
                                <p><strong>Performance:</strong> {product.PowerSupply.performance}W</p>
                                <p><strong>4-Pin Connector:</strong> {product.PowerSupply.fourPinConnector ? 'Yes' : 'No'}</p>
                                <p><strong>6-Pin VGA:</strong> {product.PowerSupply.sixPinVGA ? 'Yes' : 'No'}</p>
                                <p><strong>Size:</strong> {product.PowerSupply.size}</p>
                            </>
                        )}

                        {product.Powerhouse && (
                            <>
                                <h3>{product.name}</h3>
                                <p><strong>Motherboard Type:</strong> {product.Powerhouse.motherboardType}</p>
                                <p><strong>Fans:</strong> {product.Powerhouse.fans}</p>
                                <p><strong>Size:</strong> {product.Powerhouse.size}</p>
                            </>
                        )}
                    </Col>
                    <Col>
                        <img
                            src={`http://localhost:3000/uploads/${product.imgSrc}`}
                            alt={product.name}
                        />
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
}

export default ProductDetails;
