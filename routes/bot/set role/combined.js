import { CustomPlayerMessage, sendMessageToPlayer } from './playerMessage.js';
import { game } from '../startGameCycle.js';
import { roles } from '../bot actions/roles.js';
import { RoleBalancer, RoleFactory } from '../asign roles/objRoleStrategy.js';
import { CustomRoleBalance } from '../asign roles/CustomRoleBalancer.js';

// Crear una instancia del CustomRoleBalance
const customStrategy = new CustomRoleBalance();

// Crear una instancia del RoleBalancer utilizando el CustomRoleBalanceStrategy
const roleBalancer = new RoleBalancer(customStrategy);

// Crear una instancia del RoleFactory
const roleFactory = new RoleFactory();

export function verifyAndAssignRoles(bot,chatId) {
  // Calcular los roles balanceados utilizando el CustomRoleBalanceStrategy
  const balancedRoles = roleBalancer.getBalancedRoles(game.players.length);
  console.log("step up:balancedRoles in verifyAndAssignRoles: ")

  // Actualizar los roles disponibles en la instancia del RoleFactory con los roles balanceados calculados previamente
  roleFactory.setRoles(balancedRoles);

  // Verificar si todos los roles en el arreglo son válidos
  const allRolesValid = balancedRoles.every(role => roleFactory.roles.includes(role));

  if (allRolesValid) {
    bot.telegram.sendMessage(chatId, `*El balance de roles es válido.* ✅`, { parse_mode: "Markdown" });
    game.setGameStarted(true);
    console.log("step 2:AsignRoles")
    game.players.forEach((player,index )=> {
      //player.role = balancedRoles[index];
      // Asignar un rol al jugador utilizando la instancia del RoleFactory
      roleFactory.assignRole(player,index);
      //roleFactory.assignRole(player, index);
      // Crear una instancia del CustomPlayerMessage para el jugador actual
      const customPlayerMessage = new CustomPlayerMessage(player,roles);

      // Generar el mensaje personalizado para el jugador actual
      const message = customPlayerMessage.getMessage();

      // Enviar el mensaje al jugador utilizando la función o método apropiado
      sendMessageToPlayer(bot, player.id, message);
    });
  } else {
    // Notificar al usuario que el balance de roles no es válido
    bot.telegram.sendMessage(game.chatId, 'El balance de roles es inválido. Hay roles que no existen en la lista de roles disponibles.');
    // Proporcionar opciones para corregir el problema
    bot.telegram.sendMessage(game.chatId, `Opciones: Corregir el balance de roles manualmente, Generar un nuevo balance de roles automáticamente`);
  }
}
