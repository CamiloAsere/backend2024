// roleAsign.js usando `Factory` pattern// 
import { players } from '../game.js';
import { CustomRoleBalance } from './customRoleBalance.js';

// Modificar la clase RoleBalancer para tomar una instancia de CustomRoleBalance como un parámetro
export class RoleBalancer {
  constructor(customRoleBalance) {
    this.customRoleBalance = customRoleBalance;
  }

  getBalancedRoles(numPlayers) {
    // Utilizar la instancia de CustomRoleBalance para calcular los roles balanceados
    return this.customRoleBalance.getBalancedRoles(numPlayers);
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

  assignRole(player) {
    // Asignar un rol al jugador utilizando un índice aleatorio
    const roleIndex = Math.floor(Math.random() * this.roles.length);
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

// Crear una instancia del CustomRoleBalance
const customRoleBalance = new CustomRoleBalance();

// Crear una instancia del RoleBalancer utilizando la instancia del CustomRoleBalance
const roleBalancer = new RoleBalancer(customRoleBalance);

// Calcular los roles balanceados utilizando la instancia del RoleBalancer
const balancedRoles = roleBalancer.getBalancedRoles(players.length);

// Crear una instancia del RoleFactory
const roleFactory = new RoleFactory();

// Actualizar los roles disponibles en la instancia del RoleFactory con los roles balanceados calculados previamente
roleFactory.setRoles(balancedRoles);

// Asignar un rol a cada jugador utilizando la instancia del RoleFactory
players.forEach(player => {
  roleFactory.assignRole(player);
});
