import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const Brand = styled.section`
  font-size: 26px;
  font-weight: bold;
  color: #f45531;
  background-color: #f8f9fa;
`;

const NavLink = styled('a')`
  color: #007bff;
  text-decoration: none;
  background-color: transparent;
  display: block;
  padding: 0.5rem 1rem;
  background-color: #f8f9fa;
`;

const Text = styled.section`
  display: block;
  padding: 0.5rem 1rem;
  background-color: #f8f9fa;
`;

const Toolbar = ({ user }) => (
  <Navbar bg="light" expand="lg">
    <Navbar.Brand href="/">
      <Brand>AvalonStats</Brand>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse style={{ backgroundColor: '#f8f9fa' }} id="basic-navbar-nav">
      <Nav className="mr-auto">
        <NavLink href="/newgame">New Game</NavLink>
        <NavLink href="/games">Games</NavLink>
      </Nav>
      {user.username ? <Text>{user.username}</Text> : <Text>Not Logged In</Text>}
    </Navbar.Collapse>
  </Navbar>
);

export default Toolbar;
