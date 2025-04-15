import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row className="text-center text-md-start">
          
          {/* Brand Section */}
          <Col md={4} className="mb-3">
            <h4 className="fw-bold">PixelForge</h4>
            <p className="">
              Building powerful PCs for gamers and creators.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={4} className="mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light text-decoration-none">Home</a></li>
              <li><a href="/products" className="text-light text-decoration-none">Shop</a></li>
            </ul>
          </Col>

          {/* Social Media */}
          <Col md={4} className="mb-3 text-md-end">
            <h5>Follow Us</h5>
            <div className="d-flex justify-content-center justify-content-md-end gap-3 mt-2">
              <a href="https://www.facebook.com/" className="text-light fs-5"><FaFacebookF /></a>
              <a href="https://x.com/" className="text-light fs-5"><FaTwitter /></a>
              <a href="https://www.instagram.com/" className="text-light fs-5"><FaInstagram /></a>
              <a href="https://github.com/abraham-bence" className="text-light fs-5"><FaGithub /></a>
            </div>
          </Col>

        </Row>

        {/* Copyright Section */}
        <div className="text-center mt-4 text-light small">
          © {new Date().getFullYear()} PixelForge. All rights reserved.
        </div>

      </Container>
    </footer>
  );
}
