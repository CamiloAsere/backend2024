export const findPlayer = (userId, players )=>
    userId === undefined ? undefined : players.find(player => player.id === +userId)