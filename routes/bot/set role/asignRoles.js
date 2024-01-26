//asignRoles.js;
// asignRoles.js
import { CustomPlayerMessage, sendMessageToPlayer } from './playerMessage.js';
// Importar la clase RoleBalancer y RoleFactory
import { game } from '../startGameCycle.js';
import { roles } from '../bot actions/roles.js';
import { RoleBalancer, RoleFactory } from '../asign roles/objRoleStrategy.js';
import { CustomRoleBalance } from '../asign roles/CustomRoleBalancer.js';

// Modificar la función assignRolesAndSendMessages para que tome un segundo parámetro balancedRoles
export function assignRolesAndSendMessages(bot, balancedRoles) {
// Utilizar el parámetro balancedRoles en lugar de volver a calcular los roles balanceados
  // const balancedRoles = roleBalancer.getBalancedRoles(game.players.length);
  // Crear una instancia del RoleFactory
  const roleFactory = new RoleFactory();

  console.log("step 2:AsignRoles")
  // Actualizar los roles disponibles en la instancia del RoleFactory con los roles balanceados calculados previamente
  roleFactory.setRoles(balancedRoles);

  game.players.forEach((player,index )=> {
    //player.role = balancedRoles[index];
    // Asignar un rol al jugador utilizando la instancia del RoleFactory
    roleFactory.assignRole(player, index);
    //roleFactory.assignRole(player, index);
    // Crear una instancia del CustomPlayerMessage para el jugador actual
    const customPlayerMessage = new CustomPlayerMessage(player,roles);

    // Generar el mensaje personalizado para el jugador actual
    const message = customPlayerMessage.getMessage();

    // Enviar el mensaje al jugador utilizando la función o método apropiado
    sendMessageToPlayer(bot, player.id, message);
  });
}
/*
import { CustomPlayerMessage, sendMessageToPlayer } from './playerMessage.js';
// Importar la clase RoleBalancer y RoleFactory
import { game } from '../startGameCycle.js';
import { roles } from '../bot actions/roles.js';
import { RoleBalancer, RoleFactory } from '../asign roles/objRoleStrategy.js';
import { CustomRoleBalance } from '../asign roles/CustomRoleBalancer.js';

export function assignRolesAndSendMessages(bot) {
  // Crear una instancia del CustomRoleBalance
  const customStrategy = new CustomRoleBalance();
  //console.log("roleBalancer in assignRolesAndSendMessages ",roleBalancer)
  // Crear una instancia del RoleBalancer utilizando el CustomRoleBalanceStrategy
  const roleBalancer = new RoleBalancer(customStrategy);

  // Calcular los roles balanceados utilizando el CustomRoleBalanceStrategy
  const balancedRoles = roleBalancer.getBalancedRoles(game.players.length);
  console.log("step 2:balancedRoles in assignRolesAndSendMessages ", balancedRoles)
  // Crear una instancia del RoleFactory
  const roleFactory = new RoleFactory();

  // Actualizar los roles disponibles en la instancia del RoleFactory con los roles balanceados calculados previamente
  roleFactory.setRoles(balancedRoles);

  game.players.forEach((player,index )=> {
    player.role = balancedRoles[index];
    
    // Asignar un rol al jugador utilizando la instancia del RoleFactory
    roleFactory.assignRole(player);

    // Crear una instancia del CustomPlayerMessage para el jugador actual
    const customPlayerMessage = new CustomPlayerMessage(player,roles);

    // Generar el mensaje personalizado para el jugador actual
    const message = customPlayerMessage.getMessage();

    // Enviar el mensaje al jugador utilizando la función o método apropiado
    sendMessageToPlayer(bot, player.id, message);
  });
}
*/
