// roleAsign.js usando `Strategy` pattern// 

import { roles } from "../bot actions/roles.js";
import { RoleAssigner } from "./newRoleAssigner.js";

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

  assignRole(player,roleIndex ) {
    /*
  // Verificar si hay roles disponibles
  if (this.roles.length > 0) {
    // Calcular un índice aleatorio para seleccionar un rol del arreglo de roles disponibles
    const roleIndex = Math.floor(Math.random() * this.roles.length);
    // Asignar el rol seleccionado al jugador
    const role = this.roles[roleIndex];
    player.role = role;
    // Eliminar el rol asignado del arreglo de roles disponibles
    this.roles.splice(roleIndex, 1);
  } else {
    // No hay roles disponibles para asignar
    console.log('No hay roles disponibles para asignar');
  }
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
     
   //...
   // Actualizar las propiedades del objeto player
     if (player.role !== null && typeof roles[player.role] === 'function') {
      const roleData = roles[player.role]();
      player.actions = { ...roleData.actions };
      player.team = roleData.team;
      player.roleName = roleData.roleName;
      player.emoji = roleData.emoji;
      player.description = roleData.notes;
    }
    //...//

  }
}
const players=[
  {id: 1, name:"Alice", role:null},
  {id: 2, name:"Peter", role:null},
  {id: 3, name:"Kerry Kototo", role:null},
  {id: 4, name:"Paloma", role:null},
  {id: 5, name:"John", role:null},
  {id: 6, name:"Abdon", role:null},
  {id: 7, name:"Serresiete", role:null},
  {id: 8, name:"Roberto", role:null},
  {id: 9, name:"Woody", role:null},
  {id: 10, name:"Hughie", role:null},
 
]

/*
// Crear una instancia del CustomRoleBalance
const customStrategy = new CustomRoleBalance();

// Crear una instancia del RoleBalancer utilizando el CustomRoleBalanceStrategy
const roleBalancer = new RoleBalancer(customStrategy);


// Calcular los roles balanceados utilizando el CustomRoleBalanceStrategy
const balancedRoles = roleBalancer.getBalancedRoles(players.length);
console.log('balancedRoles en la clase Strategy')
// Crear una instancia del RoleFactory
const roleFactory = new RoleFactory();

// Actualizar los roles disponibles en la instancia del RoleFactory con los roles balanceados calculados previamente
roleFactory.setRoles(balancedRoles);

// Asignar un rol a cada jugador
players.forEach((player, index) => {
 //player.role = balancedRoles[index];
 roleFactory.assignRole(player,index);
 });
 
 

 console.log("players ",players.map((player)=> player.role ))
*/
