// Definir una clase GroupRoleBalancer para manejar la lógica de crear balances de roles por grupos
class GroupRoleBalancer {
    constructor(groups) {
      this.groups = groups;
    }
  
    getBalancedRoles(numPlayers) {
      // Crear un arreglo con los roles balanceados
      const balancedRoles = [];
  
      // Recorrer los grupos y agregar los roles correspondientes al arreglo
      this.groups.forEach(group => {
        if (group.condition(numPlayers)) {
          balancedRoles.push(...group.roles);
        }
      });
  
      return balancedRoles;
    }
  }
  
  // Definir los grupos de roles
  const groups = [
    {
      condition: T => T >= 30,
      roles: ['🙇‍♂️']
    },
    {
      condition: T => T >= 17,
      roles: ['🦅', '🌟', '🐶', '🤯']
    },
    // ...
  ];
  
  // Crear una instancia del GroupRoleBalancer
  const roleBalancer = new GroupRoleBalancer(groups);
  
  // Obtener un arreglo con los roles balanceados según el número total de jugadores
  const balancedRoles = roleBalancer.getBalancedRoles(players.length);
  