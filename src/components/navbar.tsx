import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import "../css/navbar.scss"

function NavigationBar() {
    return (
        <Navbar className="my-navbar" expand="lg">
            <Container>
                <Navbar.Brand href="/">PixelForge</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/products">Products</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar