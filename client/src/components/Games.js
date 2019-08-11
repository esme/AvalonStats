import React from 'react';
import styled from 'tachyons-components';

const Main = styled('div')`
  measure center pa4
`;

const Games = ({ gameData }) => (
  <Main>
    <h3>Games</h3>
    {gameData.map(el => <span>{el.title}</span>)}
  </Main>
);

export default Games;
