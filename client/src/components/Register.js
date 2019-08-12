import React from 'react';

import {
  Avatar,
  Main,
  Button,
  Div,
  Input,
} from './StyledComponents';

const Register = ({ handleChange, handleRegister }) => (
  <Main>
    <Avatar
      src="http://www.gonnageek.com/wp-content/uploads/2013/11/avalon1.jpg"
      style={{ objectFit: 'cover' }}
    />
    <h3>Register</h3>
    <form onChange={e => handleChange(e)} onSubmit={e => handleRegister(e)}>
      <Div>
        <label>Username</label>
        <br />
        <Input type="text" name="tempUser" minLength="1" required />
      </Div>
      <Div>
        <label>Password</label>
        <br />
        <Input type="password" name="password" minLength="4" required />
      </Div>
      <Div>
        <label>Verify Password</label>
        <br />
        <Input type="password" name="password2" minLength="4" required />
      </Div>
      <Div>
        <Button type="submit" value="Register" />
      </Div>
    </form>
    <br />
    <a href="/">Login</a>
  </Main>
);

export default Register;
