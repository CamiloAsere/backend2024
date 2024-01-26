
//CustomRoleBalancer.js//
import { addRequiredRoles, fillerRoles, requiredRoles } from "./defaultRoles.js";
import { getRandomElements, getRoleByPercentage } from "./random.js";
// Definir una clase CustomRoleBalanceStrategy para manejar la lógica de crear balances de roles personalizados
export class CustomRoleBalance {
 constructor() {
 // Inicializar el arreglo de roles y el caché de roles balanceados
 this.roles = [];
  this.balancedRolesCache = new Map();
  // Inicializar el arreglo de roles para rellenar con el valor proporcionado
  this.fillerRoles = fillerRoles;
  //console.log(this.fillerRoles)
  this.requiredRoles=requiredRoles
  //console.log(this.requiredRoles)
 }

 getBalancedRoles(numPlayers) {
    const MAX_PLAYERS=70
    console.log('Calculating balanced roles for', numPlayers, 'players');
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
 //const numWolves = Math.floor(numPlayers / 5);

 // Calcular el número de aldeanos en función del número total de jugadores
 const numVillagers = Math.floor(numPlayers / 6);
 
 // Crear un arreglo con los roles balanceados
 const balancedRoles = [...this.roles];
 // ...
 const balancedRolesSet = new Set(balancedRoles);
 addRequiredRoles(balancedRoles, balancedRolesSet, this.requiredRoles, numPlayers);
 
// Agregar el resto de los roles al arreglo de roles balanceados
// ...
    balancedRoles.push(...new Array(numVillagers).fill('villager'));
    if ( numPlayers >=14){
    const roles = ['mason', 'saboteur','cultist'];
    const percentages = {
      mason: 0.2,
      saboteur: 0.6,
      cultist:0.3
    };
    for (let i = 0; i < roles.length; i++) {
      const selectedRole = getRoleByPercentage(roles, percentages);
      if (selectedRole !== null) {
       balancedRoles.push(selectedRole);
      }
      
    }
  }

    if (numPlayers>=5){
        const rolesToSelectFrom = ['wolf','arsonist'];
         const selectedRoles = getRandomElements(rolesToSelectFrom, 1);
         balancedRoles.push(...selectedRoles);
   }
 
    if (numPlayers >= 5) {
        const rolesToSelectFrom = ['fool','clumsyGuy','woodMan','beaker'];
        const selectedRoles = getRandomElements(rolesToSelectFrom, 1);
        balancedRoles.push(...selectedRoles);
      }
    
  if (numPlayers>=5){
       const rolesToSelectFrom = ['princess','mayor','pacifist'];
        const selectedRoles = getRandomElements(rolesToSelectFrom, 1)[0];
        const percentages = {
          [selectedRoles]: 0.4
        };
        const selectedRole = getRoleByPercentage([selectedRoles], percentages);
        
        console.log("selected",selectedRole)
        if (selectedRole !== null) {
          balancedRoles.push(selectedRole);
        }
        
  }
  //
  if (numPlayers >= 6) {
    const rolesToSelectFrom = ['cursed','drunk','wiseElder','mason','beholder'];
    const selectedRoles = getRandomElements(rolesToSelectFrom, 1);
    balancedRoles.push(...selectedRoles);
  }
if (numPlayers>=7){
    const rolesToSelectFrom = ['seer','doubleVoter','snitch','oracle'];
    const selectedRoles = getRandomElements(rolesToSelectFrom, 1);
    balancedRoles.push(...selectedRoles);
}
if (numPlayers>=8){
    const rolesToSelectFrom = ['gunner','spy','hunter'];
    const selectedRoles = getRandomElements(rolesToSelectFrom, 1)[0];
    const percentages = {
      [selectedRoles]: 0.4
    };
    const selectedRole = getRoleByPercentage([selectedRoles], percentages);
    
    console.log("selected 1 ",selectedRole)
    if (selectedRole !== null) {
      balancedRoles.push(selectedRole);
    }
}
if (numPlayers>=9){
    const rolesToSelectFrom = ['traitor','impostor','wildChild'];
    const selectedRoles = getRandomElements(rolesToSelectFrom, 1)[0];
    const percentages = {
      [selectedRoles]: 0.5
    };
    const selectedRole = getRoleByPercentage([selectedRoles], percentages);
    
    console.log("selected 2",selectedRole)
    if (selectedRole !== null) {
      balancedRoles.push(selectedRole);
    }
}

if (numPlayers>=8){
       const rolesToSelectFrom = ['serialKiller','druid','wolfClub']///hasta aqui
       const selectedRoles = getRandomElements(rolesToSelectFrom, 1)[0];
       const percentages = {
         [selectedRoles]: 0.4
       };
       const selectedRole = getRoleByPercentage([selectedRoles], percentages);
       
       console.log("selected 3 ",selectedRole)
       if (selectedRole !== null) {
         balancedRoles.push(selectedRole);
       }
      }
if (numPlayers>=11){
                const rolesToSelectFrom = ['cupid','doppelganger'];
                const selectedRoles = getRandomElements(rolesToSelectFrom, 1)[0];
                const percentages = {
                  [selectedRoles]: 0.4
                };
                const selectedRole = getRoleByPercentage([selectedRoles], percentages);
                
                console.log("selected 4 ",selectedRole)
                if (selectedRole !== null) {
                  balancedRoles.push(selectedRole);
                }
}

if (numPlayers>=12){
    const rolesToSelectFrom = ['harlot','herbalist'];
    const selectedRoles = getRandomElements(rolesToSelectFrom, 1);
    balancedRoles.push(...selectedRoles);
    }
    
  if (numPlayers>=12){
    balancedRoles.push('lycan','sorcerer','healer','beauty')}
    
  if (numPlayers>=17){
    balancedRoles.push('leader','apprenticeSeer','cannibal','puppetMaster')}
  if (numPlayers>=28){
    balancedRoles.push('undead')}
 
 /*
// Agregar primero los roles obligatorios al arreglo de roles balanceados
    const balancedRolesSet = new Set(balancedRoles);
    Object.entries(this.requiredRoles).forEach(([role, minPlayers]) => {
      if (numPlayers >= minPlayers && !balancedRolesSet.has(role)) {
        balancedRoles.push(role);
        balancedRolesSet.add(role);
      }
    });
    */


for (let i = balancedRoles.length; i < numPlayers; i++) {
    balancedRoles.push(this.fillerRoles[fillerIndex]);
    fillerIndex = (fillerIndex + 1) % this.fillerRoles.length;
  }
  // ...
 return balancedRoles;
 }
}


/*
// Verificar si el arreglo de roles balanceados ya está lleno antes de agregar más roles
while (balancedRoles.length < numPlayers) {
  balancedRoles.push(fillerRoles[fillerIndex]);
  fillerIndex = (fillerIndex + 1) % fillerRoles.length;
}

// Verificar si el arreglo de roles balanceados ya está lleno antes de agregar más roles
while (balancedRoles.length < numPlayers) {
    balancedRoles.push(this.fillerRoles[fillerIndex]);
    fillerIndex = (fillerIndex + 1) % this.fillerRoles.length;
  }
*/
/*
Una forma de mejorar la eficiencia del código en la clase CustomRoleBalance sería utilizar un objeto en lugar de un arreglo para almacenar los roles balanceados. Esto permitiría verificar si un rol ya está presente en el objeto de roles balanceados en tiempo constante en lugar de tener que buscar en el arreglo cada vez.
*/
/*

El método `getBalancedRoles` de la clase `CustomRoleBalance` que has proporcionado es bastante eficiente en términos de tiempo de ejecución y uso de memoria. Utiliza un caché para almacenar los balances de roles previamente calculados y evitar recalcularlos en llamadas posteriores al método. También utiliza un objeto `requiredRoles` para definir los roles obligatorios y el número mínimo de jugadores requerido para agregar cada rol al arreglo de roles balanceados, lo que simplifica la lógica de agregar roles obligatorios al arreglo.

Si deseas mejorar aún más la eficiencia del método `getBalancedRoles`, puedes considerar las siguientes opciones:

- Utilizar una estructura de datos más eficiente para almacenar el caché de roles balanceados, como un `Map` o un objeto con claves numéricas en lugar de un objeto con claves de cadena.
- Utilizar una estructura de datos más eficiente para verificar si el arreglo de roles balanceados ya contiene un rol obligatorio, como un `Set` o un objeto con claves de cadena en lugar de utilizar el método `includes` del arreglo.
- Reducir el número de operaciones que modifican el arreglo de roles balanceados, como agregar roles personalizados o rellenar el arreglo con roles del arreglo de roles para rellenar, utilizando operaciones más eficientes como `push` o `concat` en lugar de utilizar el operador de propagación (`...`).

En resumen, el método `getBalancedRoles` que has proporcionado es bastante eficiente en términos de tiempo de ejecución y uso de memoria. Si deseas mejorar aún más su eficiencia, puedes considerar utilizar estructuras de datos más eficientes o reducir el número de operaciones que modifican el arreglo de roles balanceados. ¿Hay algo más en lo que pueda ayudarte?
*/

//U0tilizar un Map en lugar de un objeto para almacenar el caché de roles balanceados. Esto puede mejorar la eficiencia de las operaciones de búsqueda y actualización del caché. Por ejemplo:

/*
constructor() {
    // Inicializar el arreglo de roles y el caché de roles balanceados
    this.roles = Object.keys(roles);
    this.balancedRolesCache = new Map();
  }
  
  getBalancedRoles(numPlayers) {
    // ...
  
    // Verificar si ya se ha calculado el balance de roles para este número de jugadores
    if (this.balancedRolesCache.has(numPlayers)) {
      return this.balancedRolesCache.get(numPlayers);
    }
  
    // ...
  
    // Almacenar el balance de roles en el caché
    this.balancedRolesCache.set(numPlayers, balancedRoles);
  
    // ...
  }
  
  //Utilizar un Set en lugar de un arreglo para almacenar los roles obligatorios y verificar si el arreglo de roles balanceados ya contiene un rol obligatorio. Esto puede mejorar la eficiencia de las operaciones de búsqueda y actualización del conjunto de roles obligatorios. Por ejemplo:
  
  getBalancedRoles(numPlayers) {
    // ...
  
    // Agregar primero los roles obligatorios al arreglo de roles balanceados
    const balancedRolesSet = new Set(balancedRoles);
    Object.entries(requiredRoles).forEach(([role, minPlayers]) => {
      if (numPlayers >= minPlayers && !balancedRolesSet.has(role)) {
        balancedRoles.push(role);
        balancedRolesSet.add(role);
      }
    });
  
    // ...
  }

  
//Utilizar el método push en lugar del operador de propagación (...) para agregar elementos al arreglo de roles balanceados. Esto puede mejorar la eficiencia y la legibilidad del código. Por ejemplo:
  

  getBalancedRoles(numPlayers) {
    // ...
  
    // Agregar los roles de lobo y aldeano al arreglo de roles balanceados
    balancedRoles.push(...new Array(numWolves).fill('wolf'));
    balancedRoles.push(...new Array(numVillagers).fill('aldeano'));
  
    // ...
  }
  */