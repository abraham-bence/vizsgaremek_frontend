import { Navbar, Container, Nav } from 'react-bootstrap'
import "../css/navbar.scss"
import SearchBar from './searchBar'
import { CgProfile } from 'react-icons/cg'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { FaRegHeart } from 'react-icons/fa'

interface Props {
    className: string
}

function NavigationBar({ className }: Props) {
    return (
        <Navbar className={className} expand="lg">
            <Container>
                <Navbar.Brand href="/">
                    <img src='src\assets\logo1.png' className='brand-icon' />{' '}
                    PixelForge
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav >
                        <Nav.Link href="/products" className='link'>Products</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse id="basic-navbar-nav">
                    <SearchBar />
                </Navbar.Collapse>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/favorites"> <FaRegHeart className='icon secondary' /> </Nav.Link>
                        <Nav.Link href="/cart"> <MdOutlineShoppingCart className='icon secondary' /> </Nav.Link>
                        <Nav.Link href="/profile/login"> <CgProfile className='icon' /> </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar