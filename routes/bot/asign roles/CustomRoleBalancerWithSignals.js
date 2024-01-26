//import { Signal } from "../Utils/SIgnal2.js";
import { MySignal } from "../Utils/Signal.js";
import { RolManager } from "../Utils/roleManager.js";
import { addRequiredRole, fillerRoles, requiredRoles } from "./defaultRoles.js";
import { getRandomElements, getRoleByPercentage } from "./random.js";

export class CustomRoleBalance extends MySignal{
  constructor() {
    super({
      roles: {},
      numPlayers: 0,
    });
    this.fillerRoles = fillerRoles;
    this.requiredRoles = requiredRoles;
    
  }

  setNumPlayers(numPlayers) {
    this.numPlayers = numPlayers;
    this.balancedRoles = this.getBalancedRoles(numPlayers);
  }

  getBalancedRoles(numPlayers) {
      console.log('Calculating balanced roles on', numPlayers, 'players');
    const MAX_PLAYERS = 70;
    let balancedRoles = {};
    
    // Verificar si el número de jugadores es válido
    if (numPlayers > 0 && numPlayers <= MAX_PLAYERS) {
      const numWolves = Math.floor(numPlayers / 5);
      const numVillagers = Math.floor(numPlayers / 6);

      addRequiredRole(balancedRoles, this.requiredRoles, numPlayers);
      //balancedRoles['wolf'] = numWolves;
      balancedRoles['villager'] = numVillagers;
// Tu lógica de selección de roles aquí
if (numPlayers >= 14) {
  const roles = ['mason', 'saboteur', 'cultist'];
  const percentages = {
    mason: 0.2,
    saboteur: 0.6,
    cultist: 0.3
  };
  for (let i = 0; i < roles.length; i++) {
    const selectedRole = getRoleByPercentage(roles, percentages);
    if (selectedRole !== null) {
      balancedRoles[selectedRole] = (balancedRoles[selectedRole] || 0) + 1;
    }
  }
}
if (numPlayers >= 5) {
  const rolesToSelectFrom = ['wolf', 'arsonist'];
  const selectedRole = getRandomElements(rolesToSelectFrom, 1)[0];
  balancedRoles[selectedRole] = (balancedRoles[selectedRole] || 0) + 1;
}
if (numPlayers >= 5) {
const rolesToSelectFrom = ['fool', 'clumsyGuy', 'woodMan', 'beaker'];
const selectedRole = getRandomElements(rolesToSelectFrom, 1)[0];
balancedRoles[selectedRole] = (balancedRoles[selectedRole] || 0) + 1;
}

if (numPlayers >= 5) {
const rolesToSelectFrom = ['princess', 'mayor', 'pacifist'];
const selectedRole = getRandomElements(rolesToSelectFrom, 1)[0];
const percentages = {
[selectedRole]: 0.4
};
const selectedRoleByPercentage = getRoleByPercentage([selectedRole], percentages);
if (selectedRoleByPercentage !== null) {
balancedRoles[selectedRoleByPercentage] = (balancedRoles[selectedRoleByPercentage] || 0) + 1;
}
}
if (numPlayers >= 6) {
const rolesToSelectFrom = ['cursed', 'drunk', 'wiseElder', 'mason', 'beholder'];
const selectedRole = getRandomElements(rolesToSelectFrom, 1)[0];
balancedRoles[selectedRole] = (balancedRoles[selectedRole] || 0) + 1;
}

if (numPlayers >= 7) {
const rolesToSelectFrom = ['seer', 'doubleVoter', 'snitch', 'oracle'];
const selectedRole = getRandomElements(rolesToSelectFrom, 1)[0];
balancedRoles[selectedRole] = (balancedRoles[selectedRole] || 0) + 1;
}

if (numPlayers >= 8) {
const rolesToSelectFrom = ['gunner', 'spy', 'hunter'];
const selectedRole = getRandomElements(rolesToSelectFrom, 1)[0];
const percentages = {
[selectedRole]: 0.4
};
const selectedRoleByPercentage = getRoleByPercentage([selectedRole], percentages);
if (selectedRoleByPercentage !== null) {
balancedRoles[selectedRoleByPercentage] = (balancedRoles[selectedRoleByPercentage] || 0) + 1;
}
}
if (numPlayers >= 9) {
const rolesToSelectFrom = ['traitor', 'impostor', 'wildChild'];
const selectedRole = getRandomElements(rolesToSelectFrom, 1)[0];
const percentages = {
[selectedRole]: 0.5
};
const selectedRoleByPercentage = getRoleByPercentage([selectedRole], percentages);
if (selectedRoleByPercentage !== null) {
balancedRoles[selectedRoleByPercentage] = (balancedRoles[selectedRoleByPercentage] || 0) + 1;
}
}

if (numPlayers >= 8) {
const rolesToSelectFrom = ['serialKiller', 'druid', 'wolfClub'];
const selectedRole = getRandomElements(rolesToSelectFrom, 1)[0];
const percentages = {
[selectedRole]: 0.4
};
const selectedRoleByPercentage = getRoleByPercentage([selectedRole], percentages);
if (selectedRoleByPercentage !== null) {
balancedRoles[selectedRoleByPercentage] = (balancedRoles[selectedRoleByPercentage] || 0) + 1;
}
}

if (numPlayers >= 11) {
const rolesToSelectFrom = ['cupid', 'doppelganger'];
const selectedRole = getRandomElements(rolesToSelectFrom, 1)[0];
const percentages = {
[selectedRole]: 0.4
};
const selectedRoleByPercentage = getRoleByPercentage([selectedRole], percentages);
if (selectedRoleByPercentage !== null) {
balancedRoles[selectedRoleByPercentage] = (balancedRoles[selectedRoleByPercentage] || 0) + 1;
}
}

if (numPlayers >= 12) {
const rolesToSelectFrom = ['harlot', 'herbalist'];
const selectedRole = getRandomElements(rolesToSelectFrom, 1)[0];
balancedRoles[selectedRole] = (balancedRoles[selectedRole] || 0) + 1;
}

if (numPlayers >= 12) {
  ['lycan', 'sorcerer', 'healer', 'beauty'].forEach(role => {
    balancedRoles[role] = (balancedRoles[role] || 0) + 1;
  });
}


if (numPlayers >= 17) {
['leader', 'apprenticeSeer', 'cannibal', 'puppetMaster'].forEach(role => {
balancedRoles[role] = (balancedRoles[role] || 0) + 1;
});
}

if (numPlayers >= 28) {
balancedRoles['undead'] = (balancedRoles['undead'] || 0) + 1;
}

     // Al final, añade roles de relleno si es necesario
  let fillerIndex = 0;
  const totalRoles = Object.values(balancedRoles).reduce((a, b) => a + b, 0);
  for (let i = totalRoles; i < numPlayers; i++) {
    const fillerRole = this.fillerRoles[fillerIndex];
    balancedRoles[fillerRole] = (balancedRoles[fillerRole] || 0) + 1;
    fillerIndex = (fillerIndex + 1) % this.fillerRoles.length;
  }
 
    } else {
      throw new Error(`Número de jugadores no válido: ${numPlayers}`);
    }
  
  // Crear una instancia de RolManager con los roles balanceados
  const rolManager = new RolManager(balancedRoles);

  // Usar RolManager para obtener la misma cantidad de roles que de jugadores
  balancedRoles = rolManager.asignarRoles(numPlayers);
  
    return balancedRoles;
  }
}
