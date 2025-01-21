import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'; // Import Link for navigation

function Navbarr() {
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Logo</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="#home" className="text-light fw-bold">Find Doctors</Nav.Link>
            <Nav.Link href="#features" className="text-light fw-bold">Hospitals</Nav.Link>
            <Nav.Link as={Link} to="/my-bookings" className="text-light fw-bold">My Bookings</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navbarr;
