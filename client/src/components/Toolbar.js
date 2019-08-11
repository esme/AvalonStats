import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styled from 'styled-components';

const Header = styled.section`
  height: 65px;
  padding: 0 20px;
  font-size: 26px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => (props.whiteColor ? '#f7f7f7' : '#28282a')};
  span {
    color: #f45531;
    background-color: ${props => (props.whiteColor ? '#f7f7f7' : '#28282a')};
  }
`;

const Brand = styled.section`
  font-size: 26px;
  font-weight: bold;
  color: #f45531;
`;

const Toolbar = () => (
  <Navbar expand="lg">
    <Navbar.Brand href="#home">
      <Brand>Avalon Stats</Brand>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/">Link</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Toolbar;
