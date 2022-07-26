import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import useAuth from './../../../hooks/useAuth';

const Header = () => {
    const { user, logout } = useAuth();
    return (
        <div >
            <Navbar bg="dark" variant="dark" sticky="top" scollapseOnSelect expand="lg">
                <Container className="border-bottom border-white pb-1">
                    <Navbar.Brand as={Link} to="/home">MotoZone</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav.Link as={HashLink} to="/home" className="text-white">Home</Nav.Link>
                        <Nav.Link as={HashLink} to="/showroom" className="text-white">Showroom</Nav.Link>
                        {user.email &&
                            <Nav.Link as={HashLink} to="/dashboard" className="text-white">Dashboard</Nav.Link>}
                        {user.email ?
                            <Nav.Link as={HashLink} onClick={logout} to="/login" className="text-white">Logout</Nav.Link> :
                            <Nav.Link as={HashLink} to="/login" className="text-white">Login</Nav.Link>}

                        {user.email &&
                            <Navbar.Text className="text-warning">
                                Hi, {user?.displayName}
                            </Navbar.Text>}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;