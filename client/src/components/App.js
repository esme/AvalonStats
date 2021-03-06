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
import Profile from './Profile';
import { resistance } from './Roles';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    color: ${({ darkTheme }) => (darkTheme ? 'white' : null)};
    background-color: ${({ darkTheme }) => (darkTheme ? '#222' : null)};
  }

  input, button {
    padding: 0;
    font: inherit;
    color: inherit;
    background: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0;
    box-sizing: content-box;
    border-color: ${({ darkTheme }) => (!darkTheme ? '#222' : null)};
  }
`;

const initialState = {
  id: '',
  username: '',
  startDate: new Date(),
  playersArr: ['1', '2', '3', '4', '5'],
  playersRoleArr: ['merlin', 'percival', 'vt', 'assassin', 'morgana'],
  winningTeam: 'resistance',
  tempName: '',
  title: '',
  totalGamesPlayed: 0,
  totalLosses: 0,
  totalResLosses: 0,
  totalResWins: 0,
  totalWins: 0,
  darkTheme: false,
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    id,
    tempUser,
    username,
    password,
    password2,
    startDate,
    title,
    gameData,
    winningTeam,
    totalGamesPlayed,
    totalLosses,
    totalResLosses,
    totalResWins,
    totalWins,
    playersArr,
    playersRoleArr,
    darkTheme,
  } = state;

  let { tempName } = state;

  console.log('state: ', state);

  const getPlayer = () => {
    axios.get(`/player/${username}`)
      .then(({ data }) => {
        if (data) {
          console.log('get player:', data);
          dispatch({ type: 'player_data', payload: data });
        }
      });
  };

  const handleLogin = (e) => {
    if (e) { e.preventDefault(); }
    axios.post('/login', { username: tempUser, password })
      .then(({ data }) => {
        console.log('login: ', data);
        if (data.username) {
          const user = { id: data._id, username: data.username };
          console.log(user);
          dispatch({ type: 'user', payload: user });
          getPlayer();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (tempUser) {
      axios.post('/register', { username: tempUser, password, password2 })
        .then(() => handleLogin());
    }
  };

  const handleCheck = () => {
    dispatch({ type: 'check_box' });
    if (id) {
      axios.post(`/theme/${id}/${darkTheme}`);
    }
  };

  const getTheme = () => {
    axios.get(`/theme/${id}`)
      .then(({ data }) => {
        if (data) {
          handleCheck();
        }
      });
  };

  const getUser = () => {
    axios.get('/user')
      .then(({ data }) => {
        console.log('user: ', data);
        if (data.username) {
          const user = { id: data._id, username: data.username };
          dispatch({ type: 'user', payload: user });
          getPlayer();
          getTheme();
        }
      });
  };

  const handleChange = e => dispatch({ type: 'input_details', payload: { [e.target.name]: e.target.value } });

  const handleChangePlayer = (e, i) => dispatch({ type: 'change_player', payload: { [e.target.name]: e.target.value, i } });

  const handleChangeDate = date => dispatch({ type: 'change_date', payload: date });

  const handleAddPlayer = !playersArr.includes(tempName) && tempName ? () => dispatch({ type: 'add_player' }) : null;

  const handleSelectTeam = e => dispatch({ type: 'select_team', payload: { [e.target.id]: e.target.value } });

  const handleAddGame = () => {
    const resistanceTeam = [];
    const spyTeam = [];
    if (playersArr.length) {
      playersArr.forEach((playerName, i) => {
        const playerRole = playersRoleArr[i];
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
        players: JSON.stringify(playersArr),
      })
        .then(() => window.location.reload());
    } else {
      alert('You need to add at least one player');
    }
  };

  const getGames = () => {
    axios.get('/gamedata')
      .then(({ data }) => {
        console.log('gamedata:', data);
        dispatch({ type: 'game_data', payload: data });
      });
  };

  const handleLogout = () => {
    axios.get('/logout')
      .then(() => dispatch({ type: 'user', payload: { username: '', id: '' } }));
  };

  useEffect(() => {
    getGames();
    getUser();
  }, []);

  return (
    <Router>
      <React.Fragment>
        <GlobalStyle darkTheme={darkTheme} />
        <Toolbar
          username={username}
          handleLogout={handleLogout}
          darkTheme={darkTheme}
          handleCheck={handleCheck}
        />
      </React.Fragment>
      <Switch>
        <Route
          exact
          path="/"
          render={username ? () => (
            <Profile
              username={username}
              totalGamesPlayed={totalGamesPlayed}
              totalLosses={totalLosses}
              totalResLosses={totalResLosses}
              totalResWins={totalResWins}
              totalWins={totalWins}
            />
          ) : () => <Login handleChange={handleChange} handleLogin={handleLogin} darkTheme={darkTheme}/>}
        />
        <Route
          path="/register"
          render={() => <Register handleChange={handleChange} handleRegister={handleRegister} darkTheme={darkTheme}/>}
        />
        <Route
          path="/newgame"
          render={() => (
            <NewGame
              startDate={startDate}
              handleChangeDate={handleChangeDate}
              handleChange={handleChange}
              handleChangePlayer={handleChangePlayer}
              handleAddPlayer={handleAddPlayer}
              playersArr={playersArr}
              playersRoleArr={playersRoleArr}
              handleAddGame={handleAddGame}
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
