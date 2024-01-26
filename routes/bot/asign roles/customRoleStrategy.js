// roleAsign.js usando `Strategy` pattern// 
/*
import { players } from '../game.js';
import { CustomRoleBalance } from './customRoleBalanceStrategy.js';
*/
// Modificar la clase RoleBalancer para tomar una instancia de una estrategia como un parámetro
export class RoleBalancer {
  constructor(strategy) {
    // Inicializar la estrategia utilizada para crear balances de roles
    this.strategy = strategy;
  }

  getBalancedRoles(numPlayers) {
    // Utilizar la estrategia para calcular los roles balanceados
    return this.strategy.getBalancedRoles(numPlayers);
  }
}

// Definir una clase RoleFactory para manejar la creación y asignación de roles
export class RoleFactory {
  constructor() {
    // Inicializar el arreglo de roles y el objeto para llevar el conteo de roles asignados
    this.roles = [];
    this.roleCounts = {};
  }

  setRoles(roles) {
    // Actualizar los roles disponibles en la instancia del RoleFactory
    this.roles = [...roles];
  }
  // Modificar el método assignRole para que tome un segundo parámetro roleIndex
  assignRole(player, roleIndex /*parametro agregado */) {
    /*
    // Asignar un rol al jugador utilizando un índice aleatorio
    const roleIndex = Math.floor(Math.random() * this.roles.length);
    const role = this.roles[roleIndex];
    player.role = role;
    */
     // Utilizar el parámetro roleIndex en lugar de calcular un índice aleatorio
     const role = this.roles[roleIndex];
     player.role = role;
 

    // Actualizar el conteo de roles asignados
    if (this.roleCounts[role]) {
      this.roleCounts[role]++;
    } else {
      this.roleCounts[role] = 1;
    }
  }
}





/*
// Crear una instancia del CustomRoleBalance
const customStrategy = new CustomRoleBalance();

// Crear una instancia del RoleBalancer utilizando el CustomRoleBalanceStrategy
const roleBalancer = new RoleBalancer(customStrategy);

// Calcular los roles balanceados utilizando el CustomRoleBalanceStrategy
const balancedRoles = roleBalancer.getBalancedRoles(players.length);

// Crear una instancia del RoleFactory
const roleFactory = new RoleFactory();

// Actualizar los roles disponibles en la instancia del RoleFactory con los roles balanceados calculados previamente
roleFactory.setRoles(balancedRoles);

// Asignar un rol a cada jugador utilizando la instancia del RoleFactory
players.forEach(player => {
  roleFactory.assignRole(player);
});
*/