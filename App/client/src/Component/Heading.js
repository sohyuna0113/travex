import React from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import firebase from '../firebase';

function Heading() {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate();

  const LogoutHandler = () => {
    firebase.auth().signOut();
    navigate('/');
  }

  return (
        <Navbar bg="dark" expand="lg" variant="dark">
          <Container>
            <Navbar.Brand href="/">Travex-Korea</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link>
                    <Link to="/" style={{ color: "white", textDecoration: "none" }}>home</Link>
                </Nav.Link>
                <Nav.Link>
                    <Link to="/upload" style={{ color: "white", textDecoration: "none" }}>upload</Link>
                </Nav.Link>
                <Nav.Link>
                    <Link to="/list" style={{ color: "white", textDecoration: "none" }}>list</Link>
                </Nav.Link>
                
                <Nav.Link>
                    <Link to="/register" style={{ color: "white", textDecoration: "none" }}>register</Link>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse>
              <Navbar.Collapse className='justify-content-end'>
                {user.accessToken ?  (
                  <>
                  <Navbar.Text
                    style={{ color: "white", cursor: "pointer", marginRight: "10px"}}
                    onClick={() => LogoutHandler()}>
                      logout
                  </Navbar.Text>
                  <br />
                  <Navbar.Text
                    style={{ color: "white", cursor: "pointer" }}>
                    <Link to="/MyPage" style={{ color: "white", textDecoration: "none" }}>
                      MyPage
                    </Link>
                  </Navbar.Text>
                </>
                ) : (
                  <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
                    login
                    </Link>
                )}
                </Navbar.Collapse>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    );
  }
export default Heading