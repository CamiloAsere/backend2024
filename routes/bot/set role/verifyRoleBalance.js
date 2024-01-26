// verifyRoleBalance.js
import { CustomRoleBalance } from "../asign roles/customRoleBalancer2.js";
import { RoleBalancer, RoleFactory } from "../asign roles/objRoleStrategy.js";

export function verifyRoleBalance(numPlayers) {
  // Crear una instancia del CustomRoleBalance
  const customStrategy = new CustomRoleBalance();

  // Crear una instancia del RoleBalancer utilizando el CustomRoleBalanceStrategy
  const roleBalancer = new RoleBalancer(customStrategy);
 //console.log("verifyRoleBalance ",roleBalancer);
  // Calcular los roles balanceados utilizando el CustomRoleBalanceStrategy
  const balancedRoles = roleBalancer.getBalancedRoles(numPlayers);
  console.log("step 1:balancedRoles in verifyRoleBalance ")
  // Crear una instancia del RoleFactory
  const roleFactory = new RoleFactory();

  // Actualizar los roles disponibles en la instancia del RoleFactory con los roles balanceados calculados previamente
  roleFactory.setRoles(balancedRoles);

  // Verificar si todos los roles en el arreglo son válidos
  const allRolesValid = balancedRoles.every(role => roleFactory.roles.includes(role));

  // Si todos los roles son válidos, retornar un objeto indicando que el balance de roles es válido y agregar el arreglo de roles balanceados al objeto retornado
  if (allRolesValid) {
    return {
      valid: true,
      message: 'El balance de roles es válido.',
      options: [],
      balancedRoles: balancedRoles
    };
  }

  // Si hay roles inválidos, retornar un objeto indicando que el balance de roles es inválido y proporcionar opciones para corregirlo
  return {
    valid: false,
    message: 'El balance de roles es inválido. Hay roles que no existen en la lista de roles disponibles.',
    options: [
      'Corregir el balance de roles manualmente',
      'Generar un nuevo balance de roles automáticamente'
    ],
    balancedRoles: balancedRoles
  };
}