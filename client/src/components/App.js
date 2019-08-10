import React, { useState, useEffect, useReducer } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Register from './Register';
import Login from './Login';
import axios from 'axios';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    color: ${props => (props.whiteColor ? '#222' : '#eee')};
    background-color: ${props => (props.whiteColor ? 'white' : '#222')};
    font-family: "Open Sans";
  }
`;

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

const initialState = {};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'input_details':
      return { ...state, ...action.payload };
    default:
      throw new Error();
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { username, password, password2 } = state;
  console.log(state);

  const handleRegister = () => axios.post('/register', { username, password, password2 });

  const handleLogin = () => axios.post('/login', { username, password });

  const handleChange = e => dispatch({ type: 'input_details', payload: { [e.target.name]: e.target.value } });

  return (
    <React.Fragment>
      <GlobalStyle whiteColor />
      <Header whiteColor>
        <span>AvalonStats</span>
      </Header>
      <Register handleChange={handleChange} handleRegister={handleRegister} />
      <Login handleChange={handleChange} handleLogin={handleLogin} />
    </React.Fragment>
  );
};

export default App;
