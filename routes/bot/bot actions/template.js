
import { Player } from "../roles/Player";
import { Game} from "../startGameCycle";

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