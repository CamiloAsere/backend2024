//Undead.js//
export class Undead {
    constructor(player) {
      this.player = player;
      this.team = 'Undead';
    }
  
    kill(targetPlayer) {
      if (!this.player.games.leaderIsAlive) {
        this.player.performAction({ type: 'kill', target: targetPlayer });
      }
    }
  }