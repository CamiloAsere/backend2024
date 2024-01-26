import { assignRolesToPlayers } from "./Asssign.js";

//newRoleAssigner.js
export class RoleAssigner {
  constructor(roles, numRequiredRoles) {
    this.roles = roles;
    this.numRequiredRoles = numRequiredRoles;
    this.playerRoles = [];
  }

  assignRoles() {
    // Crear un array con todos los roles
    let allRoles = [];
    for (let roleName in this.roles) {
      let count = this.roles[roleName];
      while (count-- > 0) {
        allRoles.push(roleName);
      }
    }
  
    // Mezclar el array de roles
    for (let i = allRoles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allRoles[i], allRoles[j]] = [allRoles[j], allRoles[i]];  // Intercambiar elementos
    }
  
    // Asignar roles a los jugadores
    this.playerRoles = allRoles;
  
    return this.playerRoles;
  }
  
}

const players=[
  {id: 0, name:"Taylor", role:null},
  {id: 1, name:"Alice", role:null},
  {id: 2, name:"Peter", role:null},
  {id: 3, name:"Kerry Kototo", role:null},
  {id: 4, name:"Paloma", role:null},
  {id: 5, name:"John", role:null},
 
  {id: 6, name:"Abdon", role:null},
  {id: 7, name:"Serresiete", role:null},
  {id: 8, name:"Roberto", role:null},
  {id: 9, name:"Woody", role:null},
  {id: 10, name:"Till", role:null},
  {id: 11, name:"Hughie", role:null},
 
]
  // Luego puedes llamar a esta función con tu array de jugadores
  assignRolesToPlayers(players);