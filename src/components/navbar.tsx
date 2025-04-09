import { Navbar, Container, Nav} from 'react-bootstrap'
import "../css/navbar.scss"
import SearchBar from './searchBar'
import { CgProfile } from 'react-icons/cg'

interface Props {
    className: string
}

function NavigationBar({ className }: Props) {
    return (
        <Navbar className={className} expand="lg">
            <Container>
                <Navbar.Brand href="/">PixelForge</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <SearchBar />
                </Navbar.Collapse>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/products" className='link'>Products</Nav.Link>
                        <Nav.Link href="/profile/login"> <CgProfile className='icon'/> </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar