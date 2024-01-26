// controller.js
import { addPlayer, assignRoles, startGame, isGameStarted } from './model.js'
import { sendMessage } from './view.js'

export function handleStartCommand(chatId) {
  if (isGameStarted()) {
    sendMessage(chatId, 'El juego ya ha comenzado.')
  } else {
    addPlayer({ id: chatId })
    sendMessage(chatId, 'Te has unido al juego.')
  }
}

export function handleBeginCommand(chatId) {
  if (isGameStarted()) {
    sendMessage(chatId, 'El juego ya ha comenzado.')
  } else {
    assignRoles()
    startGame()
    sendMessage(chatId, 'El juego ha comenzado.')
  }
}
/*
En este ejemplo, definimos el controlador en el archivo controller.js. 
El controlador incluye funciones para manejar los comandos /start y /begin del bot. 
Cuando el usuario envía el comando /start, el controlador verifica si el juego ya ha comenzado 
y, si no es así, agrega al jugador al juego y envía un mensaje de confirmación. 
Cuando el usuario envía el comando /begin, el controlador verifica si el juego ya ha comenzado 
y, si no es así, asigna los roles a los jugadores, inicia el juego y envía un mensaje de confirmación.
*/