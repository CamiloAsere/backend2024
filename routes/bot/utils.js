// Definir la interfaz para las estrategias
class GameCycleStrategy {
    start(bot) {}
    /* 
    Aunque el parámetro bot en el método start de la clase GameCycleStrategy no se utiliza, se define
     para especificar que las clases que extienden GameCycleStrategy deben aceptar
     un argumento bot cuando sobrescriben el método start. Luego, puedes utilizar este argumento 
     dentro de las clases que extienden GameCycleStrategy para interactuar con Telegram 
     */
  }
  
  // Definir una estrategia para manejar el ciclo del juego durante el día
  class DayCycleStrategy extends GameCycleStrategy {
    start(bot) {
      // Aquí puedes agregar el código para manejar el ciclo del juego durante el día
      bot.telegram.sendAnimation(GRUPO_ID, URL_DAY_GIF, {caption:'Ya es de día...'})
      bot.telegram.sendMessage(GRUPO_ID, `Ha amanecido en el pueblo. Es hora de discutir y votar para linchar a un sospechoso.`);
      sendVillagerOptions();
      // Mostrar lista de jugadores vivos
      const alivePlayers = players.filter(player => player.alive).map(player => `${player.name} ${roleDescriptions[player.role].emoji}`).join(', ')
      bot.telegram.sendMessage(GRUPO_ID, `Jugadores vivos: ${alivePlayers}`);

    }
  }
  
  // Definir una estrategia para manejar el ciclo del juego durante la noche
  class NightCycleStrategy extends GameCycleStrategy {
    start(bot) {
      // Aquí puedes agregar el código para manejar el ciclo del juego durante la noche
       // Inicio de la noche
       bot.telegram.sendAnimation(GRUPO_ID,  URL_NIGHT_GIF, {caption:'Empezando el juego'})
       bot.telegram.sendMessage(GRUPO_ID, `Ha anochecido en el pueblo. Los lobos están eligiendo a su próxima víctima.`);
       sendWolfOptions();
       sendSeerOptions();
       sendWitchOptions();
       sendDruidOptions();
       // Mostrar lista de jugadores
       const playerList = players.map(player => player.name).join(', ')
       bot.telegram.sendMessage(GRUPO_ID, `Jugadores: ${playerList}`);
       
       // Finalizar fase de noche después de un tiempo determinado
       setTimeout(() => {
         endNightPhase();
       }, NIGHT_PHASE_DURATION);
    }
  }
  
  // Crear instancias de las estrategias
  const dayCycleStrategy = new DayCycleStrategy();
  const nightCycleStrategy = new NightCycleStrategy();
  
  // Definir la función startGameCycle utilizando el patrón de diseño Estrategia
  export function startGameCycle(bot) {
    day = !day;
    let strategy;
    
    if (day /* El juego está en la fase de día */) {
      strategy = dayCycleStrategy;
    } else (/* El juego está en la fase de noche */) {
      strategy = nightCycleStrategy;
    }
    strategy.start(bot);
  
  }


/*
function StartNightPhase() {
  // Inicio de la noche
  bot.telegram.sendAnimation(GRUPO_ID,  URL_NIGHT_GIF, {caption:'Empezando el juego'})
  bot.telegram.sendMessage(GRUPO_ID, `Ha anochecido en el pueblo. Los lobos están eligiendo a su próxima víctima.`);
  sendWolfOptions();
  sendSeerOptions();
  sendWitchOptions();
  sendDruidOptions();
  // Mostrar lista de jugadores
  const playerList = players.map(player => player.name).join(', ')
  bot.telegram.sendMessage(GRUPO_ID, `Jugadores: ${playerList}`);
  
  // Finalizar fase de noche después de un tiempo determinado
}
function StartDayPhase() {
  // Inicio del día
  bot.telegram.sendAnimation(GRUPO_ID, URL_DAY_GIF, {caption:'Ya es de día...'})
  bot.telegram.sendMessage(GRUPO_ID, `Ha amanecido en el pueblo. Es hora de discutir y votar para linchar a un sospechoso.`);
  sendVillagerOptions();
  // Mostrar lista de jugadores vivos
  const alivePlayers = players.filter(player => player.alive).map(player => `${player.name} ${roleDescriptions[player.role].emoji}`).join(', ')
  bot.telegram.sendMessage(GRUPO_ID, `Jugadores vivos: ${alivePlayers}`);
}
export function startGameCycle() {
let day = false;
setInterval(() => {
    day = !day;
    if(day){
      StartDayPhase()
    } else{
      StartNightPhase()
      // Finalizar fase de noche después de un tiempo determinado
      setTimeout(() => {
        endNightPhase();
      }, NIGHT_PHASE_DURATION);
    }
  }, VOTING_TIME_LIMIT);
}
*/
  
    