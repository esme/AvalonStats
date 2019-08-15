function reducer(state, action) {
  const tempName = '';
  const playersArr = [...state.playersArr];
  const playersRoleArr = [...state.playersRoleArr];
  if (action.type === 'add_player') {
    playersArr.push(state.tempName);
    playersRoleArr.push('merlin');
  }

  if (action.type === 'change_player') {
    console.log(action.payload)
    const { playerName, playerRole, i } = action.payload;
    if (playerName !== undefined) {
      playersArr[i] = playerName;
    }
    if (playerRole !== undefined) {
      playersRoleArr[i] = playerRole;
    }
  }

  switch (action.type) {
    case 'input_details':
      return { ...state, ...action.payload };
    case 'change_date':
      return { ...state, startDate: action.payload };
    case 'add_player':
      return { ...state, playersArr, playersRoleArr, tempName };
    case 'game_data':
      return { ...state, gameData: action.payload };
    case 'user':
      return { ...state, id: action.payload.id, username: action.payload.username };
    case 'select_team':
      return { ...state, ...action.payload };
    case 'player_data':
      return {
        ...state,
        totalGamesPlayed: action.payload.totalGamesPlayed,
        totalLosses: action.payload.totalLosses,
        totalResLosses: action.payload.totalResLosses,
        totalResWins: action.payload.totalResWins,
        totalWins: action.payload.totalWins,
      };
    case 'change_player':
      return { ...state, playersArr, playersRoleArr };
    case 'check_box':
      return { ...state, darkTheme: !state.darkTheme };
    default:
      throw new Error();
  }
}

export default reducer;
