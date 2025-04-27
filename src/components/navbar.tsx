import { Navbar, Container, Nav, Offcanvas } from 'react-bootstrap';
import "../css/navbar.scss";
import SearchBar from './searchBar';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { FaRegHeart } from 'react-icons/fa';

interface Props {
    resetFilters?: () => void;
}

function NavigationBar({ resetFilters }: Props) {
    return (
        <Navbar className="my-navbar" expand="md" >
            <Container>
                <Navbar.Brand href="/">
                    <img src="src/assets/logo1.png" className="brand-icon" alt="logo" />{' '}
                    <span className='brand-text'>PixelForge</span>
                </Navbar.Brand>

                <SearchBar resetFilters={resetFilters} />

                <Navbar.Toggle aria-controls="offcanvasNavbar" />

                <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="end" // 🔥 this is the key!
                    className="slide-navbar"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
                    </Offcanvas.Header>

                    <Offcanvas.Body>
                        <Nav className="me-auto">
                            <Nav.Link href="/products" className="link">
                                Products
                            </Nav.Link>
                        </Nav>



                        <Nav className="ms-auto d-flex align-items-center">
                            <Nav.Link href="/favorites">
                                <FaRegHeart className="icon secondary" />
                            </Nav.Link>
                            <Nav.Link href="/cart">
                                <MdOutlineShoppingCart className="icon secondary" />
                            </Nav.Link>
                            <Nav.Link href="/profile/login">
                                <CgProfile className="icon" />
                            </Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
