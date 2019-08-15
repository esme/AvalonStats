import React from 'react';

import {
  Avatar,
  Main,
  Button,
  Div,
  Input,
} from './StyledComponents';

const Login = ({ handleChange, handleLogin, darkTheme }) => (
  <Main>
    <Avatar
      src="https://images-na.ssl-images-amazon.com/images/I/416NJQ9V7BL.jpg"
      style={{ objectFit: 'cover', objectPosition: '0 30%' }}
    />
    <h3>Login</h3>
    <form onChange={e => handleChange(e)} onSubmit={e => handleLogin(e)}>
      <Div>
        <label>Username</label>
        <br />
        <Input type="text" name="tempUser" minLength="1" required darkTheme={darkTheme} />
      </Div>
      <Div>
        <label>Password</label>
        <br />
        <Input type="password" name="password" minLength="4" required darkTheme={darkTheme} />
      </Div>
      <Div>
        <Button type="submit" value="Login" minLength="4" required darkTheme={darkTheme} />
      </Div>
    </form>
    <br />
    <a href="/register">Create Account</a>
  </Main>
);

export default Login;
