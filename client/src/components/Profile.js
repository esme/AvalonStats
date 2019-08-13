import React from 'react';

import {
  Avatar,
  Main,
  Button,
  Div,
  Input,
} from './StyledComponents';

const Profile = ({
  username,
  totalGamesPlayed,
  totalLosses,
  totalResLosses,
  totalResWins,
  totalWins,
}) => (
  <Main>
    <Avatar
      src="http://i.imgur.com/j5PRT7G.png"
      style={{ objectFit: 'cover', objectPosition: '0 30%' }}
    />
    <h3>Username: {username}</h3>
    <Div>Total Games Played: {totalGamesPlayed}</Div>
    <Div>Total Games Won: {totalWins}</Div>
    <Div>Total Games Lost: {totalLosses}</Div>
    <Div>Win Rate: {totalWins / totalGamesPlayed * 100}%</Div>
    <br />
    <Div>Gaming Group: {username}</Div>
    <Div><Button type="button" value="Change Gaming Group" /></Div>
  </Main>
);

export default Profile;
