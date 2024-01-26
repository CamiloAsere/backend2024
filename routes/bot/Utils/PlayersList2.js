import {highlightPlayer} from "../Utils/highlightPlayer.js";
import { MyTextFormatter } from "./textFormatter.js";

export const listaDeJugadores = (game) => {
    const players = game.players;
    if (!players || players.length === 0) {
        return 'No hay jugadores en la lista.';
    }
    const alivePlayers = players.filter(e => e.isAlive);
    const nameWidth = 16; // Define el ancho fijo para el nombre del jugador
    const statusWidth = 16; // Define el ancho fijo para el estado del jugador
    const totalWidth = 50; // Define el ancho total de la línea
    const playerList = players.map((e, i) => {
        const formatter = new MyTextFormatter(e.name, nameWidth);
        const playerName = {...e, newName: formatter.format()}; // Crear un nuevo objeto playerName
        const status = e.isAlive ? '🙂 Vivo(a)' : `💀 Muerto(a) - *${e.rol?.roleName}*`;
        const statusFormatter = new MyTextFormatter(status, statusWidth);
        const formattedStatus = statusFormatter.format();
        const intermediateSpace =' '.repeat(totalWidth - nameWidth - statusWidth-8); 
        return `${i+1}. ${playerName.newName}${intermediateSpace}${formattedStatus}`; // Nota el '+1' aquí para el espacio adicional
    }).join('\n');
    return `🔗<b>Jugadores vivos</b> (${alivePlayers.length}/${players.length}):\n${playerList}`;
};








   /*
        let playerName = e.name;
        if (playerName.length > fixedWidth) {
            playerName = playerName.substring(0, fixedWidth - 3) + '...'; // Trunca el nombre y agrega '...' si es más largo que el ancho fijo
        } else {
            playerName = playerName.padEnd(fixedWidth, ' '); // Rellena con espacios si el nombre es más corto que el ancho fijo
        }
        */
/*
export const listaDeJugadores = (game) => {
    const players = game.players 
      return `<b>Jugadores vivos</b> (${players.sort((p) => -!p.isAlive )
                .filter(e => e.isAlive).length}/${players.length}):\n`
            + players.map(e =>
                `${e.isAlive ? highlightPlayer(e) : `*${e.name}*`}: ${e.isAlive ?
                    '🙂 Vivo(a)' : `💀 Muerto(a) - *${e.rol?.roleName}*`}`
            ).join('\n')
    }
*/
/*
export const listaDeJugadores = (game) => {
    const players = game.players;
    if (!players || players.length === 0) {
        return 'No hay jugadores en la lista.';
    }
    const alivePlayers = players.filter(e => e.isAlive);
    const maxLength = Math.max(...players.map(p => p.name.length));
    const playerList = players.map((e, i) => {
        const paddedName = e.name.padEnd(maxLength, ' ');
        return `${i+1}. ${e.isAlive ? highlightPlayer(e) : `*${paddedName}*`}: ${e.isAlive ?
            '🙂 Vivo(a)' : `💀 Muerto(a) - *${e.rol?.roleName}*`}`
    }).join('\n');
    return `🔗<b>Jugadores vivos</b> (${alivePlayers.length}/${players.length}):\n${playerList}`;
};
*/