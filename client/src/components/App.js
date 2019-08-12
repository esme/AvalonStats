import React, { useState, useEffect, useReducer } from 'react';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Register from './Register';
import Login from './Login';
import Toolbar from './Toolbar';
import NewGame from './NewGame';
import Games from './Games';
import reducer from './reducer';
import { resistance } from './Roles';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    color: ${props => (props.whiteColor ? '#222' : '#eee')};
    background-color: ${props => (props.whiteColor ? 'white' : '#222')};
  }
`;

const initialState = {
  id: '',
  username: '',
  startDate: new Date(),
  players: {},
  winningTeam: 'resistance',
  tempName: '',
  title: '',
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    id,
    username,
    password,
    password2,
    startDate,
    players,
    title,
    gameData,
    winningTeam,
  } = state;

  let { tempName } = state;

  // console.log(state);

  const handleRegister = (e) => {
    e.preventDefault();
    if (username) {
      axios.post('/register', { username, password, password2 })
        .then(({ data }) => console.log(data));
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('/login', { username, password })
      .then(({ data }) => {
        if (data) {
          window.location = '/games';
        } else {
          window.location = '/';
        }
      })
      .catch((error) => {
        window.location = '/';
      });
  };

  const handleChange = e => dispatch({ type: 'input_details', payload: { [e.target.name]: e.target.value } });

  const handleChangeDate = date => dispatch({ type: 'change_date', payload: date });

  const handleAddPlayer = players[tempName] ? null : () => dispatch({ type: 'add_player' });

  const handleSelectTeam = e => dispatch({ type: 'select_team', payload: { [e.target.id]: e.target.value } });

  const handleSelectRole = (e, selectedPlayerName) => dispatch({ type: 'select_role', payload: { selectedPlayerName, playerRole: e.target.value } });

  const handleAddGame = () => {
    const resistanceTeam = [];
    const spyTeam = [];
    const playersArr = Object.keys(players);
    playersArr.forEach((playerName) => {
      const playerRole = players[playerName];
      if (resistance.has(playerRole)) {
        resistanceTeam.push({ playerName, playerRole });
      } else {
        spyTeam.push({ playerName, playerRole });
      }
    });
    axios.post('/game', {
      id,
      username,
      title,
      startDate,
      winningTeam,
      resistanceTeam,
      spyTeam,
    })
      .then(({ data }) => console.log(data));
  };

  const getUser = () => {
    axios.get('/user')
      .then(({ data }) => {
        if (data) {
          const payload = { id: data._id, username: data.username };
          console.log('user: ', payload);
          dispatch({ type: 'user', payload });
        }
      });
  };

  const getGames = () => {
    axios.get('/gamedata')
      .then(({ data }) => {
        console.log('gamedata:', data);
        dispatch({ type: 'game_data', payload: data });
      });
  };

  useEffect(() => {
    getGames();
    getUser();
  }, []);

  return (
    <Router>
      <React.Fragment>
        <GlobalStyle whiteColor />
        <Toolbar username={username} />
      </React.Fragment>
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Login handleChange={handleChange} handleLogin={handleLogin} />}
        />
        <Route
          path="/register"
          render={() => <Register handleChange={handleChange} handleRegister={handleRegister} />}
        />
        <Route
          path="/newgame"
          render={() => (
            <NewGame
              startDate={startDate}
              handleChangeDate={handleChangeDate}
              handleChange={handleChange}
              handleAddPlayer={handleAddPlayer}
              players={players}
              handleAddGame={handleAddGame}
              handleSelectRole={handleSelectRole}
              handleSelectTeam={handleSelectTeam}
              winningTeam={winningTeam}
              tempName={tempName}
            />
          )}
        />
        <Route
          path="/games"
          render={() => gameData && <Games gameData={gameData} />}
        />
      </Switch>
    </Router>
  );
};

export default App;
