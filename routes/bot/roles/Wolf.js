import { countWolfVotes } from "../bot actions/countWolvesVote.js";
import { Player } from "./Player.js";
//Wolf extiende de un RoleBase o Role
export class Wolf extends Role{
    // ...
    countWolfVotes(game, roles, bot) {
      // Llamar a la función countWolfVotes y pasar los argumentos necesarios
      countWolfVotes(game, roles, bot);
    }
    // ...
  }