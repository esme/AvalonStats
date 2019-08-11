import React from 'react';
import styled from 'tachyons-components';

const Avatar = styled('img')`
  br-100 h4 w4 dib ba b--black-05 pa2
`;

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

const Register = ({ handleChange, handleRegister }) => (
  <Main>
    <Avatar src="http://tachyons.io/img/avatar_1.jpg"></Avatar>
    <h3>Register</h3>
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
        <label>Verify Password</label>
        <br />
        <Input type="password" name="password2" />
      </Div>
      <Div>
        <Button type="button" onClick={e => handleRegister(e)}>Register</Button>
      </Div>
    </form>
  </Main>
);

export default Register;
