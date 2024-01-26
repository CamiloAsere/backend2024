//defaultRoles.js//
export const requiredRoles = {
    detective: (numPlayers) => numPlayers >= 15,
    alphaWolf: (numPlayers) => numPlayers >= 12 && numPlayers % 4 === 0,
    coldWolf: (numPlayers) => numPlayers === 15 ,
    speedWolf: (numPlayers) => numPlayers >= 8 && numPlayers % 5 === 0,
    arabianWolf: (numPlayers) => numPlayers === 9 && numPlayers % 3 === 0,
    leader:(numPlayers) => numPlayers === 13,
    cultistHunter:(numPlayers) => numPlayers >= 12 ||  numPlayers === 48,
    cultist:(numPlayers) => numPlayers >= 12 ||  numPlayers === 18,
    harlot:(numPlayers) => numPlayers === 14 ||  numPlayers >= 18,
    herbalist:(numPlayers) => numPlayers === 14 ||  numPlayers >= 18,
    seer:(numPlayers) => numPlayers === 14,
    snitch:(numPlayers) => numPlayers === 15 && numPlayers % 5 === 0,
    druid:(numPlayers) => numPlayers === 12 && numPlayers % 2 === 0,
    bodyguard:(numPlayers) => numPlayers >= 12 && numPlayers % 4 === 0,
    blacksmith:(numPlayers) => numPlayers >= 9 ,
    sandman:(numPlayers) => numPlayers >= 18 ,
    // ...
  }; 
  // Definir un arreglo con roles para rellenar
export const fillerRoles = ['mason', 'carcelero','survivor','wolfCLub'];

// Agregar primero los roles obligatorios al arreglo de roles balanceados
export const addRequiredRoles = (balancedRoles, balancedRolesSet, requiredRoles, numPlayers) => {
    Object.entries(requiredRoles).forEach(([role, minPlayers]) => {
      if (typeof minPlayers === 'function') {
        if (minPlayers(numPlayers) && !balancedRolesSet.has(role)) {
            console.log(`Adding required role: ${role}`);
          balancedRoles.push(role);
          balancedRolesSet.add(role);
        }
      } else {
        if (numPlayers >= minPlayers && !balancedRolesSet.has(role)) {
            console.log(`Adding required role: ${role}`);
          balancedRoles.push(role);
          balancedRolesSet.add(role);
        }
      }
    });
  };

//2da version para objetos
   export const addRequiredRole = (balancedRoles, requiredRoles, numPlayers) => {
    Object.entries(requiredRoles).forEach(([role, condition]) => {
      if (typeof condition === 'function') {
        if (condition(numPlayers) && !balancedRoles.hasOwnProperty(role)) {
          console.log(`Adding required role: ${role}`);
          balancedRoles[role] = 1;
        }
      } else {
        if (numPlayers >= condition && !balancedRoles.hasOwnProperty(role)) {
          console.log(`Adding required role: ${role}`);
          balancedRoles[role] = 1;
        }
      }
    });
  };
  

   /*
  export const addRequiredRoles = (balancedRoles, requiredRoles, numPlayers) => {
    Object.entries(requiredRoles).forEach(([role, minPlayers]) => {
      if (typeof minPlayers === 'function') {
        if (minPlayers(numPlayers) && !balancedRoles.hasOwnProperty(role)) {
          console.log(`Adding required role: ${role}`);
          balancedRoles[role] = true;
        }
      } else {
        if (numPlayers >= minPlayers && !balancedRoles.hasOwnProperty(role)) {
          console.log(`Adding required role: ${role}`);
          balancedRoles[role] = true;
        }
      }
    });
  };
  */