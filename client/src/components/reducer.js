function reducer(state, action) {
  const tempName = '';
  const players = { ...state.players };
  if (action.type === 'add_player') {
    players[state.tempName] = 'merlin';
  }

  if (action.type === 'select_role') {
    const { selectedPlayerName, playerRole } = action.payload;
    players[selectedPlayerName] = playerRole;
  }

  switch (action.type) {
    case 'input_details':
      return { ...state, ...action.payload };
    case 'change_date':
      return { ...state, startDate: action.payload };
    case 'add_player':
      return { ...state, players, tempName };
    case 'game_data':
      return { ...state, gameData: action.payload };
    case 'user':
      return { ...state, id: action.payload.id, username: action.payload.username };
    case 'select_team':
      return { ...state, ...action.payload };
    case 'select_role':
      return { ...state, players };
    default:
      throw new Error();
  }
}

export default reducer;
