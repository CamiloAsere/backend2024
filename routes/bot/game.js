import { Signal } from "./Utils/SIgnal2.js";
import { game } from "./startGameCycle.js";

//game.js//
 export const roles = [
  { name: "lobo", nightAction: false, dayAction: true, winCondition: "Werewolves wins", team: "Werewolves", weight: '-6', type: "nocturno", hasAction: true ,emoji: "🐺", description: "Eres un lobo. Cada noche eliges a una víctima para matar."},
  { name: "aldeano", nightAction: false, dayAction: false ,winCondition: "Village wins", team:"Village" , weight: '-6', type: "diurno", hasAction: false,emoji: "👨‍🌾", description: "Eres un aldeano. Tu objetivo es descubrir y linchar a los lobos."},
  { name: "vidente", nightAction:true ,dayAction:false ,winCondition:"Village wins", team:"Village" , weight: '-6', type: "nocturno", hasAction: true ,emoji: "🔮", description: "Eres un vidente. Cada noche puedes ver el rol de un jugador."},
  { name: "cazador", nightAction:false ,dayAction:false ,winCondition:"Village wins" , team:"Village" , weight: '-6', type: "nocturno", hasAction: true ,emoji: "👨‍🌾🎯", description: "Eres el cazador. No dueremes bien. Tu objetivo es descubrir y linchar a los lobos."},
  { name: "bruja", nightAction:true ,dayAction:false ,winCondition:"Werewolves wins" , team:"Werewolves" , weight: '-6', type: "nocturno", hasAction: true, emoji: "🧙‍♀️", description: "Eres una bruja. Tienes una poción para curar y otra para matar."},
  {name: "druida", nightAction:true ,dayAction:false ,winCondition:"Village wins" , team:"Village" , weight: '-6',type: "nocturno", hasAction: true ,emoji: "🌿", description: "Eres un druida. Puedes proteger a un jugador o atacar a otro cada noche."},
  {name: "mason", nightAction:false ,dayAction:false ,winCondition:"Village wins" , team:"Village" , weight: '-6', type: "diurno", hasAction: false ,emoji: "👷🏻", description: "Eres un mason.Si hay mas masones lo sabras! Tu objetivo es descubrir y linchar a los lobos."},
  {name: "Guardaespaldas", nightAction:true ,dayAction:false ,winCondition:"Village wins" , team:"Village" , weight: '-6',type: "nocturno", hasAction:true, emoji:'🛡',description:'Capaz de proteger a alguien cada noche. Si se ataca al guardaespaldas o al objetivo, ninguno muere. El próximo ataque matará al guardaespaldas'},
  {name:'Soplon', nightAction:false, dayAction:true, winCondition:'Village wins', team:'Village', weight: '-6', type:'diurno', hasAction:false, emoji:'🦜',description:'Eres un aldeano común.Puedes escoger un jugador para revelar su rol cuando mueras.'},
  {name:'Espia', nightAction:true, dayAction:false, winCondition:'Village wins', team:'Village', weight: '-6', type:'nocturno', hasAction:true, emoji:'🤵🏻‍♂',description:'Una vez por partida puedes seleccionar 2 jugadores y saber si pertenecen al mismo equipo o no. En caso de que descubras que esos 2 jugadores son del mismo equipo (excepto aldea) automáticamente quedarás descubierto como espía y morirás.'},
  {name:'Canibal', nightAction:true, dayAction:false, winCondition:'Cannibal wins', team:'cannibal', weight: '-6', type:'nocturno', hasAction:true, emoji:'🧑🏾🍖',description:'Capaz de comer un jugador o ahorrar hambre todas las noches. Ahorrar hambre te permitirá comer más personas en la misma noche. Cada noche que no comes a un jugador se te agrega un punto de hambre. Puede tener hasta 5 puntos de hambre. No pueden ser asesinados por hombres lobo.'},
  //..
  ];
  
 
export const MAX_PLAYERS=70;
export const GAME_CHAT_ID='-1001569593726'; //-1001397491522
//export const MIN_PLAYERS = roles.length
export const MIN_PLAYERS = 5;
// Definir las variables totalWolves y wolvesVoted
export let playerListMessageId = { value: null };
export let lastPlayerListMessage = { value: null };
export let lastPlayerListMessageId= { value: null };
export const roleDescriptions = {
    lobo: {name:"lobo",emoji: '🐺', description: 'Eres un lobo. Cada noche eliges a una víctima para matar.'},
    vidente: {name:"vidente",emoji: '🔮', description: 'Eres un vidente. Cada noche puedes ver el rol de un jugador.'},
    bruja: {name:"bruja",emoji: '🧙‍♀️', description: 'Eres una bruja. Tienes una poción para curar y otra para matar.'},
    aldeano: {name:"aldeano",emoji: '👨‍🌾', description: 'Eres un aldeano. Tu objetivo es descubrir y linchar a los lobos.'},
    druida: {name:"druida",emoji: '🌿', description: 'Eres un druida. Puedes proteger a un jugador o atacar a otro cada noche.'},
    druida: {name:"druida",emoji: '🌿', description: 'Eres el soplon. Puedes proteger a un jugador o atacar a otro cada noche.'},
  }

// Definimos wolvesAlive como una nueva instancia de Signal
export const wolvesAlive = new Signal({
  totalWolves: 0,
  wolvesVoted: 0
});

// ...
// Definimos la función checkAllWolvesVoted
export function checkAllWolvesVoted(bot) {
  if (wolvesAlive.get('wolvesVoted') === wolvesAlive.get('totalWolves')) {
    // Todos los lobos han votado, enviamos un mensaje a todos los jugadores
    game.players.forEach(player => {
      bot.telegram.sendMessage(player.id, 'Todos los lobos han votado. Queda poco tiempo para que el resto de los jugadores realicen sus acciones.');
    });
  }
}
export const playersState = new Signal({
  current: 0,
});
/*
export function checkAllWolvesVoted(bot) {
  if (wolvesAlive.wolvesVoted === wolvesAlive.totalWolves) {
    // Todos los lobos han votado, enviar un mensaje a todos los jugadores
    game.players.forEach(player => {
      bot.telegram.sendMessage(player.id, 'Todos los lobos han votado. Queda poco tiempo para que el resto de los jugadores realicen sus acciones.');
    });
  }
}
*/
 /*
// Definir una función de orden superior para crear funciones que modifiquen el valor de diferentes variables
function createSetter(variableName) {
  return function(value) {
    this[variableName] = value;
  };
}

// Crear funciones para modificar el valor de las variables totalWolves y wolvesVoted utilizando la función de orden superior createSetter
export const setTotalWolves = createSetter('totalWolves');
export const setWolvesVoted = createSetter('wolvesVoted');
export const wolvesAlive = {
  totalWolves: 0,
  wolvesVoted: 0,
  setTotalWolves,
  setWolvesVoted
};
*/ 