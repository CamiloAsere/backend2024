import { roles } from "../bot actions/roles.js";
import { CustomRoleBalance } from "./CustomRoleBalancerWithSignals.js";
import { RoleAssigner } from "./newRoleAssigner.js";

export function assignRolesToPlayers(players) {
    // Crear una instancia de CustomRoleBalance
    const roleBalancer = new CustomRoleBalance();
  
    // Establecer el número de jugadores
    roleBalancer.setNumPlayers(players.length);
  
    // Obtener los roles balanceados
    const balancedRoles = roleBalancer.balancedRoles;
  
    // Calcular el número de roles requeridos
    const numRequiredRoles = Object.values(roleBalancer.requiredRoles).reduce((a, b) => a + b, 0);
  
    // Crear una instancia de RoleAssigner con los roles balanceados
    const roleAssigner = new RoleAssigner(balancedRoles, numRequiredRoles);
  
    // Asignar roles a los jugadores
    const playerRoles = roleAssigner.assignRoles();
  
    // Ahora, asignar los roles a los jugadores en la lista
    for (let i = 0; i < players.length; i++) {
      players[i].role = playerRoles[i];
  
      // Actualizar las propiedades del objeto player
      if (players[i].role !== null && typeof roles[players[i].role] === 'function') {
        const roleData = roles[players[i].role]();
        players[i].actions = { ...roleData.actions };
        players[i].team = roleData.team;
        players[i].roleName = roleData.roleName;
        players[i].emoji = roleData.emoji;
        players[i].description = roleData.notes;
      }
    }
    console.log('Roles de cada jugador:', players.map(player => `${player.name}: ${player.role}`));
   }
  
  

  