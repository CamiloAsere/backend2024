export class RolManager {
    constructor(roles) {
      if (typeof roles !== 'object' || roles === null) {
        throw new Error('El argumento roles debe ser un objeto o un array');
      }
      this.roles = roles;
    }
  
    asignarRoles(numeroJugadores) {
      if (typeof numeroJugadores !== 'number') {
        throw new Error('El argumento numeroJugadores debe ser un número');
      }
      if (numeroJugadores < 5) {
        throw new Error('El número de jugadores debe ser al menos 5');
      }

      let rolesLength = Array.isArray(this.roles) ? this.roles.length : Object.keys(this.roles).length;

      if (numeroJugadores > rolesLength) {
        throw new Error('No hay suficientes roles para todos los jugadores');
      }

      if (Array.isArray(this.roles)) {
        return this.roles.slice(0, numeroJugadores);
      } else {
        // Si roles es un objeto, mantenerlo como un objeto
        const rolesKeys = Object.keys(this.roles);
        const selectedRoles = {};
        for (let i = 0; i < numeroJugadores; i++) {
          selectedRoles[rolesKeys[i]] = this.roles[rolesKeys[i]];
        }
        return selectedRoles;
      }
    }
}


/*
export class RolManager {
    constructor(roles) {
      if (typeof roles !== 'object' || roles === null) {
        throw new Error('El argumento roles debe ser un objeto o un array');
      }
      this.roles = roles;
    }
  
    asignarRoles(numeroJugadores) {
      if (typeof numeroJugadores !== 'number') {
        throw new Error('El argumento numeroJugadores debe ser un número');
      }
      if (numeroJugadores < 5) {
        throw new Error('El número de jugadores debe ser al menos 5');
      }

      if (Array.isArray(this.roles)) {
        if (numeroJugadores > this.roles.length) {
          throw new Error('No hay suficientes roles para todos los jugadores');
        }
        return this.roles.slice(0, numeroJugadores);
      } else {
        // Si roles es un objeto, mantenerlo como un objeto
        const rolesKeys = Object.keys(this.roles);
        if (numeroJugadores > rolesKeys.length) {
          throw new Error('No hay suficientes roles para todos los jugadores');
        }
        const selectedRoles = {};
        for (let i = 0; i < numeroJugadores; i++) {
          selectedRoles[rolesKeys[i]] = this.roles[rolesKeys[i]];
        }
        return selectedRoles;
      }
    }
}
*/




  /*
  const rolesIniciales = ['Rol1', 'Rol2', 'Rol3', 'Rol4', 'Rol5', 'Rol6', 'Rol7', 'Rol8'];
  const rolManager = new RolManager(rolesIniciales);
  const numeroJugadores = 3;
  const rolesDivididos = rolManager.dividirRolesParaJugadores(numeroJugadores);
  console.log(rolesDivididos);
  */