// model.js
const roles = ['lobo', 'aldeano', 'vidente', 'cazador', 'bruja']
const players = []
let gameStarted = false

export function addPlayer(player) {
  players.push(player)
}

export function assignRoles() {
  let remainingRoles = [...roles]
  players.forEach((player, index) => {
    if (index < roles.length) {
      player.role = remainingRoles.pop()
    } else {
      const roleIndex = Math.floor(Math.random() * remainingRoles.length)
      player.role = remainingRoles[roleIndex]
    }
  })
}

export function startGame() {
  gameStarted = true
}

export function isGameStarted() {
  return gameStarted
}

export function getPlayers() {
  return players
}
