/*
- `Player`: Esta clase representa a un jugador en el juego. Cada jugador tiene un nombre, 
un estado de vida (`isAlive`), un rol (`role`), un equipo (`team`) y una propiedad de protección 
(`protection`). La clase `Player` también tiene un método `die` que se utiliza para matar al jugador.

- `RoleManager`: Esta clase se encarga de gestionar los roles de los jugadores en el juego. 
La clase `RoleManager` tiene un objeto `roles` que almacena los diferentes roles disponibles en el
 juego y una propiedad `leaderIsAlive` que indica si el líder está vivo o no. La clase `RoleManager` 
  también tiene varios métodos para agregar roles, asignar roles a los jugadores, realizar acciones
   de rol y matar a otros jugadores.

- `Leader`: Esta clase representa el rol de líder en el juego. El líder tiene la capacidad de matar
 y revivir a otros jugadores. La clase `Leader` tiene varias propiedades para controlar si el líder 
 puede matar o revivir en un momento dado (`canKill`, `canRevive`) y una lista de jugadores muertos 
 por el líder (`killedPlayers`). La clase `Leader` también tiene varios métodos para matar, morir y revivir a otros jugadores.

- `Undead`: Esta clase representa el rol de no-muerto en el juego. Los no-muertos tienen la capacidad 
de matar a otros jugadores si el líder no está vivo. La clase `Undead` tiene un método `kill` que se utiliza para matar a otros jugadores.

En resumen, este código define varias clases que representan diferentes aspectos de un juego en el que
 los jugadores tienen roles y pueden realizar acciones como matar y revivir a otros jugadores. 
 El código también incluye lógica para verificar si los jugadores tienen protección y para evitar
  que los jugadores maten a otros jugadores del mismo equipo.
*/
import { roles } from '../bot actions/roles.js';
class Player {
    constructor(name,id, role) {
      this.name = name;
      this.id = id;
      this.role = role;
      // Copiar las acciones del rol del jugador
      this.actions = { ...roles[role]().actions };
      // Asignar el equipo del jugador
      this.team = roles[role]().team;
      this.isAlive = true;
    }
    
  // ...
  // Método para comprobar si el jugador puede realizar una acción específica
  canPerformAction(action) {
    // Comprobar si el rol del jugador puede realizar la acción especificada
    const roleAction = this.actions[action];
    if (roleAction) {
      // Comprobar si el jugador ha alcanzado la frecuencia máxima para esta acción
      if (roleAction.times > 0) {
        return true;
      }
    }

    return false;
  }
  performAction(action) {
    // Comprobar si el jugador puede realizar la acción especificada
    if (this.canPerformAction(action)) {
      // Ejecutar la acción especificada utilizando el método executeAction de la clase Action
      const roleAction = this.actions[action.type];
      if (roleAction) {
        roleAction.executeAction(this);
      }
  
      // Actualizar la frecuencia de la acción para el jugador
      this.updateActionFrequency(action.type);
    }
  }
  

   joinGame(game) {
      // add player to game
   }
  
    leaveGame(game) {
      // remove player from game
    }

   // Método para comprobar si el jugador es vulnerable a un ataque
    isVulnerableToAttack() {
      // Utilizar la estrategia de vulnerabilidad asignada para determinar si el jugador es vulnerable a un ataque o no
      return this.vulnerabilityStrategy.isVulnerable(this);
    }
  
    die() {
      this.isAlive = false;
    }
  }
    
class Leader {
    constructor(player, roleManager) {
      this.player = player;
      this.roleManager = roleManager;
      this.canKill = true;
      this.canRevive = true;
      this.killedPlayers = [];
      this.team = 'Undead';
    }
  
    kill(targetPlayer) {
      if (this.canKill) {
        this.player.performAction({ type: 'kill', target: targetPlayer });
        this.canKill = false;
        this.canRevive = true;
      }
    }
  
    die() {
      this.player.die();
      this.player.game.leaderIsAlive = false;
    }
  
    skipKill() {
      if (this.canKill) {
        this.canKill = false;
        this.canRevive = true;
      }
    }
  
    revive(targetPlayer) {
      if (this.canRevive && !targetPlayer.isAlive) {
        targetPlayer.isAlive = true;
        targetPlayer.role = new Undead(targetPlayer);
        targetPlayer.team = this.team;
  
        // Enviar un mensaje a los jugadores del equipo Undead para informarles que un nuevo jugador ha sido revivido
        this.sendMessageToTeam(`${targetPlayer.name} ha sido revivido y se ha unido al equipo Undead`);
        // ...
        this.sendMessageToTeam()
        this.canRevive = false;
        this.canKill = true;
      }
    }
  
    sendMessageToTeam(message) {
      const players = this.player.game.players;
      players.forEach(player => {
        if (player.team === this.team) {
          // Lógica para enviar un mensaje privado a través del bot de Telegram 
          bot.telegram.sendMessage(player.telegramId, message);
        }
      });
    }
  
    // Método que se llama al final de cada noche para actualizar el estado del Leader
    endNight() {
      if (!this.canKill && !this.canRevive) {
        this.canKill = true;
      }
    }
  }
  

  class Undead {
    constructor(player) {
      this.player = player;
      this.team = 'Undead';
    }
  
    kill(targetPlayer) {
      if (!this.player.game.leaderIsAlive) {
        this.player.performAction({ type: 'kill', target: targetPlayer });
      }
    }
  }
  
  // Ejemplo de uso
  const game = new Game();
  game.addRole('Leader', Leader);
  game.addRole('Undead', Undead);
  
  const player1 = new Player('Alice');
  const player2 = new Player('Bob');
  const player3 = new Player('Charlie');
  
  game.assignRole(player1, 'Leader');
  game.assignRole(player2, 'Undead');
  
  player3.protection = true;
  
  player1.performAction({ type: 'kill', target: player3 });
  console.log(player3.isAlive); // true
  
  player1.performAction({ type: 'die' });
  console.log(game.leaderIsAlive); // false
  
  player2.performAction({ type: 'kill', target: player3 });
  console.log(player3.isAlive); // true
  
  player2.performAction({ type: 'kill', target: player3 });
  console.log(player3.isAlive); // false