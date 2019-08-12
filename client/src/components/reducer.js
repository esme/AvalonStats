function reducer(state, action) {
  const players = [...state.players];
  if (action.type === 'select_role') {
    players[action.payload.i].playerRole = action.payload.playerRole;
  }

  switch (action.type) {
    case 'input_details':
      return { ...state, ...action.payload };
    case 'change_date':
      return { ...state, startDate: action.payload };
    case 'add_player':
      return {
        ...state,
        players: [...state.players, { playerName: state.playerName, playerRole: 'merlin' }],
      };
    case 'game_data':
      return { ...state, gameData: action.payload };
    case 'user':
      return { ...state, user: action.payload };
    case 'select_team':
      return { ...state, ...action.payload };
    case 'select_role':
      return { ...state, players };
    default:
      throw new Error();
  }
}

export default reducer;
