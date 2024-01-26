export class Leader {
    constructor(player,bot) {
      this.player = player;
      this.bot=bot;
      this.canKill = true;
      this.canRevive = true;
      this.reviveUsed = false;
      this.nightsSinceKill = 0;
      this.killedPlayers = [];
      this.team = 'Undead';

    }
  
    kill(targetPlayer) {
        if (this.canKill && this.nightsSinceKill >= 2) {
        this.player.performAction({ type: 'kill', target: targetPlayer });
        this.canKill = false;
        this.canRevive = true;
        this.nightsSinceKill = 0;
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
        if (this.canRevive && !targetPlayer.isAlive && !this.reviveUsed) {
        targetPlayer.isAlive = true;
        targetPlayer.role = new Undead(targetPlayer);
        targetPlayer.team = this.team;
  
        // Enviar un mensaje a los jugadores del equipo Undead para informarles que un nuevo jugador ha sido revivido
        this.sendMessageToTeam(`${targetPlayer.name} ha sido revivido y se ha unido al equipo Undead`);
        // ...
        this.canRevive = false;
        this.canKill = true;
        this.reviveUsed = true;
      }
    }
    sendMessageToTeam(message) {
        const players = this.player.game.players;
        players.forEach(player => {
          if (player.team === this.team) {
            // Lógica para enviar un mensaje privado a través del bot de Telegram 
            this.bot.telegram.sendMessage(player.id, message);
          }
        });
      }
      
    // Método que se llama al final de cada noche para actualizar el estado del Leader
    endNight() {
        if (!this.canKill && !this.canRevive) {
          this.canKill = true;
        }
        this.nightsSinceKill++;
      }
      
  }