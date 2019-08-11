import React from 'react';
import styled from 'tachyons-components';

const Main = styled('div')`
  measure center pa4
`;

const Button = styled('button')`
  br2 b--black-20
  b ph3 pv2 input-reset ba bg-light-gray grow pointer f6 dib w-80
`;

const Div = styled('div')`
  mt3
`;

const Input = styled('input')`
  br2 b--black-20
  pt2 pb2 input-reset ba bg-transparent hover-white w-80
`;

const Login = ({ handleChange, handleLogin }) => (
  <Main>
    <h3>Login</h3>
    <form onChange={e => handleChange(e)}>
      <Div>
        <label>Username</label>
        <br />
        <Input type="text" name="username" />
      </Div>
      <Div>
        <label>Password</label>
        <br />
        <Input type="password" name="password" />
      </Div>
      <Div>
        <Button type="button" onClick={e => handleLogin(e)}>Login</Button>
      </Div>
    </form>
    <a>Create Account</a>
  </Main>
);

export default Login;
