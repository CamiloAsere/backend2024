//RoleVerifier.js
import { Signal } from "./SIgnal2.js";

export class RoleVerifier {
  constructor(players, roles) {
    this._state = new Signal({ players, roles });
  }

  // Método para obtener los roles
  getRoles() {
    return this._state.get('roles');
  }

  // Método para buscar un rol
  searchForRole(role) {
  return this.getRoles().hasOwnProperty(role);
  }

  // Método para verificar el rol o continuar con la siguiente línea de código
  verifyRoleOrMoveOn(role, action) {
    if (this.searchForRole(role)) {
      // Si el rol existe, ejecuta la acción
      action();
    } else {
      // Si el rol no existe, continúa con la siguiente línea de código
      console.log(`El rol ${role} no existe`);
    }
  }
}

/*
// Obtener la lista de jugadores
const players = getPlayers(ctx.chat.id);

// Crear una nueva instancia de RoleVerifier
const roleVerifier = new RoleVerifier(players, roles);

// Verificar un rol o continuar con la siguiente línea de código
let lobo = 'wolf';
roleVerifier.verifyRoleOrMoveOn(lobo, () => {
  console.log(`El rol ${lobo} existe`);
  sendWolfOptions(arg1, arg2);
});

*/