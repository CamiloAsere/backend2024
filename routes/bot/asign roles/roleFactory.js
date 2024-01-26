//roleFactory.js//
// Importar la información de roles desde el archivo game.js
import { roles } from '../game.js';

// Definir una clase RoleBalancer para manejar la lógica de crear balances de roles
class RoleBalancer {
  constructor() {
    this.roles = roles.map(role => role.name);
    this.balancedRolesCache = {};
  }

  getBalancedRoles(numPlayers) {
    // Verificar si ya se ha calculado el balance de roles para este número de jugadores
    if (this.balancedRolesCache[numPlayers]) {
      return this.balancedRolesCache[numPlayers];
    }
  
    // Calcular el número de lobos en función del número total de jugadores
    const numWolves = Math.floor(numPlayers / 6);
  
    // Calcular el número de aldeanos en función del número total de jugadores
    const numVillagers = Math.floor(numPlayers / 3);
  
    // Crear un arreglo con los roles balanceados
    const balancedRoles = this.roles.concat(
      new Array(numWolves).fill('Lobo'),
      new Array(numVillagers).fill('Aldeano')
    );
  
    // Almacenar el balance de roles en el caché
    this.balancedRolesCache[numPlayers] = balancedRoles;
  
    return balancedRoles;
  }
  
}

// Definir una clase RoleFactory para manejar la creación y asignación de roles
export class RoleFactory {
  constructor() {
    this.roles = [];
    this.roleCounts = {};
  }

  setRoles(roles) {
    this.roles = [...roles];
  }

  assignRole(player) {
    // Asignar un rol al jugador
    const roleIndex = Math.floor(Math.random() * this.roles.length);
    const role = this.roles[roleIndex];
    player.role = role;

    // Actualizar el conteo de roles
    if (this.roleCounts[role]) {
      this.roleCounts[role]++;
    } else {
      this.roleCounts[role] = 1;
    }
  }
}

// Crear una instancia del RoleBalancer
const roleBalancer = new RoleBalancer();

// Crear una instancia del RoleFactory
const roleFactory = new RoleFactory();

// Obtener un arreglo con los roles balanceados según el número total de jugadores
const balancedRoles = roleBalancer.getBalancedRoles(players.length);

// Actualizar los roles disponibles en la instancia del RoleFactory
roleFactory.setRoles(balancedRoles);

// Asignar roles a los jugadores utilizando la instancia del RoleFactory

players.forEach(player => {
  roleFactory.assignRole(player);
});
