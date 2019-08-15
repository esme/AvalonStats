import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const ToolbarStyle = styled.section`
  .navbar-collapse {
    background-color: ${({ darkTheme }) => (darkTheme ? '#343a40' : null)};
  }

  .navbar-brand {
    font-size: 26px;
    font-weight: bold;
    color: #f45531 !important;
    background-color: ${({ darkTheme }) => (darkTheme ? '#343a40' : null)};
  }
`;

const NavLink = styled('a')`
  color: #007bff;
  text-decoration: none;
  background-color: transparent;
  display: block;
  padding: 0.5rem 1rem;
  background-color: ${({ darkTheme }) => (darkTheme ? '#343a40' : null)};
`;

const Text = styled.section`
  display: block;
  padding: 0.5rem 1rem;
  background-color: ${({ darkTheme }) => (darkTheme ? '#343a40' : null)};
`;

const Input = styled('input')`
  color: #007bff;
  text-decoration: none;
  background-color: transparent;
  display: block;
  padding: 0.5rem 1rem;
  border: none;
  &:focus {
    outline: none;
  }
  &:hover {
    text-decoration: underline;
  }
  background-color: ${({ darkTheme }) => (darkTheme ? '#343a40' : null)};
`;

const StyledSwitch = styled.div`
  padding: 8px 16px;
  display: flex;
  align-items: center;
  background-color: ${({ darkTheme }) => (darkTheme ? '#343a40' : null)};

  .switch {
    position : relative ;
    display : inline-block;
    width : 40px;
    height : 20px;
    background-color: #eee;
    border-radius: 20px;
  }

  .switch::after {
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: white;
    top: 1px; // TO GIVE AN EFFECT OF CIRCLE INSIDE SWITCH.
    left: 1px;
    transition: all 0.3s;
  }

  .checkbox:checked + .switch::after {
    left : 20px; 
  }

  .checkbox:checked + .switch {
    background-color: #777;
  }

  .checkbox { 
    display : none;
 } 
`;

const Toolbar = ({ username, handleLogout, darkTheme, handleCheck }) => (
  <ToolbarStyle darkTheme={darkTheme}>
    <Navbar
      collapseOnSelect
      expand="lg"
      bg={darkTheme ? 'dark' : 'light'}
      variant={darkTheme ? 'dark' : 'light'}
    >
      <Navbar.Brand href="/">AvalonStats</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink href="/newgame" darkTheme={darkTheme}>New Game</NavLink>
          <NavLink href="/games" darkTheme={darkTheme}>Games</NavLink>
        </Nav>
        {username ? <Text darkTheme={darkTheme}>{username}</Text> : <Text darkTheme={darkTheme}>Not Logged In</Text>}
        {username ? <Input type="button" onClick={handleLogout} value="Logout" darkTheme={darkTheme} /> : null}
        <StyledSwitch onClick={handleCheck} darkTheme={darkTheme}>
          <input type="checkbox" id="toggle" checked={darkTheme} onChange={handleCheck} className="checkbox" />
          <label htmlFor="toggle" className="switch" />
        </StyledSwitch>
      </Navbar.Collapse>
    </Navbar>
  </ToolbarStyle>
);

export default Toolbar;
