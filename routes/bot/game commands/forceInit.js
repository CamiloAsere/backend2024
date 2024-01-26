// Importar la función verifyRoleBalance
import { verifyRoleBalance } from './verifyRoleBalance.js';

// ...

// Definir una clase abstracta Handler para representar un objeto que maneja una solicitud
class Handler {
  constructor(next) {
    this.next = next;
  }

  handle(ctx) {
    if (this.next) {
      return this.next.handle(ctx);
    }
    return false;
  }
}

// Definir una clase RoleBalanceHandler para verificar si el balance de roles es válido
class RoleBalanceHandler extends Handler {
  handle(ctx) {
    // Verificar si el balance de roles es válido
    const roleBalance = verifyRoleBalance(players.length);

    // Si el balance de roles es inválido, notificar al usuario y proporcionar opciones para corregirlo
    if (!roleBalance.valid) {
      ctx.reply(roleBalance.message);
      ctx.reply(`Opciones: ${roleBalance.options.join(', ')}`);
      return true;
    }

    return super.handle(ctx);
  }
}

// Definir una clase MinPlayersHandler para verificar si hay suficientes jugadores para comenzar el juego
class MinPlayersHandler extends Handler {
  handle(ctx) {
    if (players.length < MIN_PLAYERS) {
      actions.replyAndDelete(
        ctx,
        `Lo siento, se necesitan al menos ${MIN_PLAYERS} jugadores para comenzar el juego. La partida ha sido cancelada.`
      );
      gameCreated = false;
      resetGame();
      return true;
    }

    return super.handle(ctx);
  }
}

// Definir una clase StartGameHandler para iniciar el juego si todas las condiciones se cumplen
class StartGameHandler extends Handler {
  handle(ctx) {
    gameStarted = true;
    actions.replyAndDelete(
      ctx,
      'Bienvenidos al juego de Hombre Lobo. La historia comienza en un pequeño pueblo donde los aldeanos viven en paz. Pero una noche, un grupo de lobos llega al pueblo y comienza a matar a los aldeanos. Los aldeanos deben descubrir quiénes son los lobos y matarlos antes de que sea demasiado tarde. ¿Están listos para jugar?'
    );
    assignRolesAndSendMessages(bot);
    game.startGameCycle();
    return true;
  }
}

// Crear una cadena de objetos que manejan diferentes condiciones
const startGameHandler = new StartGameHandler();
const minPlayersHandler = new MinPlayersHandler(startGameHandler);
const roleBalanceHandler = new RoleBalanceHandler(minPlayersHandler);

// ...

const actions = {
  // ...
  gameNotStarted: (ctx) => {
    // Pasar la solicitud a lo largo de la cadena de objetos que manejan diferentes condiciones
    roleBalanceHandler.handle(ctx);
  }
  // ...
};
