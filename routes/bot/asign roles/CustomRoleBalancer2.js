//import { roles } from "../bot actions/roles.js";
import { addRequiredRole, fillerRoles, requiredRoles } from "./defaultRoles.js";
import { getRandomElements, getRoleByPercentage } from "./random.js";
//Agregarle la logica de los Signals//
export class CustomRoleBalance {
  constructor() {
    this.roles = Object.keys({});
    this.balancedRolesCache = new Map();
    this.fillerRoles = fillerRoles;
    this.requiredRoles = requiredRoles;
  }

  getBalancedRoles(numPlayers) {
    console.log('Calculating balanced roles for', numPlayers, 'players');
    const MAX_PLAYERS = 70;
   //falta quitar el cache para evitar q t muestren el mismo balance de jugadores para un mismo numero de jugadores 
   //la condicion de comporbar el # de players no esta implementada correctamente    
    if (numPlayers > 0 && numPlayers <= MAX_PLAYERS) {
      if (this.balancedRolesCache.has(numPlayers)) {
        return this.balancedRolesCache.get(numPlayers);
      }
    }

    const numWolves = Math.floor(numPlayers / 5);
    const numVillagers = Math.floor(numPlayers / 6);

    let balancedRoles = {};
    /*
    const balancedRoles = [...this.roles];
    // ...
    const balancedRolesSet = new Set(balancedRoles);
    addRequiredRoles(balancedRoles, balancedRolesSet, this.requiredRoles, numPlayers);
    */
    //me falta definir esto; el 2do/4tos parametros
    addRequiredRole(balancedRoles, this.requiredRoles, numPlayers);

    //balancedRoles['wolf'] = numWolves;
    balancedRoles['villager'] = numVillagers;
   
    
    if (numPlayers >= 5) {
      balancedRoles['mason'] = 1;
      balancedRoles['clumsyGuy'] = 1;
      balancedRoles['hunter'] = 1;
      balancedRoles['mayor'] = 1;
      balancedRoles['oracle'] = 1;
      balancedRoles['pacifist'] = 1;
      balancedRoles['beholder'] = 1;
      balancedRoles['woodMan'] = 1;
      balancedRoles['wiseElder'] = 1;
      console.log("Añadidos varios roles en ", numPlayers)
    }
    
    // Tu lógica de selección de roles aquí
    //No se estan agregando los roles a la lista 
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

  this.balancedRolesCache.set(numPlayers, balancedRoles);

  return balancedRoles;
  }
}


/*





export class CustomRoleBalance {
  constructor() {
    // Inicializar el arreglo de roles y el caché de roles balanceados
    this.roles =Object.keys({});
    this.balancedRolesCache = new Map();
    // Inicializar el arreglo de roles para rellenar con el valor proporcionado
    this.fillerRoles = fillerRoles;
    this.requiredRoles = requiredRoles;
  }

  getBalancedRoles(numPlayers) {
    console.log('Calculating balanced roles for', numPlayers, 'players');
    const MAX_PLAYERS=70
    // Rellenar el arreglo de roles balanceados con roles del arreglo de roles para rellenar
    let fillerIndex = 0;
    // ...
    // Verificar si el número de jugadores es válido
    if (numPlayers > 0 && numPlayers <= MAX_PLAYERS) {
      // Verificar si ya se ha calculado el balance de roles para este número de jugadores
      if (this.balancedRolesCache.has(numPlayers)) {
        return this.balancedRolesCache.get(numPlayers);
      }
    }

    // Calcular el número de lobos en función del número total de jugadores
    const numWolves = Math.floor(numPlayers / 5);

    // Calcular el número de aldeanos en función del número total de jugadores
    const numVillagers = Math.floor(numPlayers / 5);

    // Crear un objeto con los roles balanceados
    const balancedRoles = {};
   
    // Agregar un rol adicional al objeto de roles balanceados
    addRequiredRoles(balancedRoles, this.requiredRoles, numPlayers);
    
    // Agregar los roles de lobo y aldeano al objeto de roles balanceados
    for (let i = 0; i < numWolves; i++) {
      
      balancedRoles['wolf'] = true;
    }
    
    for (let i = 0; i < numVillagers; i++) {
      balancedRoles['villager'] = true;
    }
    
    if (numPlayers >= 5) {
      balancedRoles['mason'] = true;
      balancedRoles['clumsyGuy'] = true;
      balancedRoles['hunter'] = true;
      balancedRoles['mayor'] = true;
      balancedRoles['oracle'] = true;
      balancedRoles['pacifist'] = true;
      balancedRoles['beholder'] = true;
      balancedRoles['woodMan'] = true;
      balancedRoles['wiseElder'] = true;
      console.log("Añadidos varios roles en ",numPlayers)
    }
    
    if (numPlayers >= 6) {
      balancedRoles['fool'] = true;
      balancedRoles['blacksmith'] = true;
      balancedRoles['seer'] = true;
      balancedRoles['cursed'] = true;
    }
    
    if (numPlayers >= 7) {
      balancedRoles['suicide'] = true;
      balancedRoles['bodyguard'] = true;
    }
    
    if (numPlayers >= 8) {
      balancedRoles['serialKiller'] = true;
      balancedRoles['traitor'] = true;
      balancedRoles['mason'] = true;
      balancedRoles['detective'] = true;
      balancedRoles['gunner'] = true;
      balancedRoles['guardianAngel'] = true;
      balancedRoles['snitch'] = true;
      balancedRoles['spy'] = true;
      balancedRoles['arabianWolf'] = true;
      balancedRoles['sorcerer'] = true;
      balancedRoles['wildChild'] = true;
      balancedRoles['doppelganger'] = true;
      balancedRoles['cupid'] = true;
      balancedRoles['sandman'] = true;
      balancedRoles['drunk'] = true;
      balancedRoles['druid'] = true; 
      balancedRoles['princess']=true
      balancedRoles['princess']=true
     }

     if (numPlayers >= 12) {
      balancedRoles['doubleVoter'] = true;
      balancedRoles['harlot'] = true;
      balancedRoles['bodyguard'] = true;
      balancedRoles['healer'] = true;
      balancedRoles['alphaWolf'] = true;
      balancedRoles['lycan'] = true;
      balancedRoles['arsonist'] = true;
      balancedRoles['beauty'] = true;
    }
    
    if (numPlayers >= 17) {
      balancedRoles['leader'] = true;
      balancedRoles['apprenticeSeer'] = true;
      balancedRoles['cannibal'] = true;
      balancedRoles['puppetMaster'] = true;
    }
    
    if (numPlayers >= 28) {
      balancedRoles['undead'] = true;
    }

    addRequiredRoles(balancedRoles, this.requiredRoles, numPlayers);

    // Agregar el resto de los roles al objeto de roles balanceados
    const numBalancedRoles = Object.keys(balancedRoles).length;
    
    for (let i = numBalancedRoles; i < numPlayers; i++) {
      balancedRoles[this.fillerRoles[fillerIndex]] = true;
      fillerIndex = (fillerIndex + 1) % this.fillerRoles.length;
    }

    // Obtener un arreglo con los roles balanceados
    const balancedRolesArray = Object.keys(balancedRoles);
   // console.log("balancedRolesArray: ", balancedRolesArray)
    
    // Almacenar el arreglo de roles balanceados en el caché
    this.balancedRolesCache.set(numPlayers, balancedRolesArray);

    return balancedRolesArray;
  }
}
*/