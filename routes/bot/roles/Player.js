// Player.js
//import { roles } from '../bot actions/roles.js';
import { BodyguardVulnerabilityStrategy, DefaultVulnerabilityStrategy, WerewolfVulnerabilityStrategy } from './vulnerable roles.js';
export class Player {
    constructor(name, id, role, game) {
      this.name = name;
      this.id = id;
      this.role = role;
      this.isAlive = true;//this.status = 'alive'; 
      this.game=game
      // Asignar la estrategia de vulnerabilidad adecuada en función del rol del jugador
      switch (role) {
      case 'Bodyguard':
        this.vulnerabilityStrategy = new BodyguardVulnerabilityStrategy();
        break;
      case 'Werewolf':
        this.vulnerabilityStrategy = new WerewolfVulnerabilityStrategy();
        break;
      default:
        this.vulnerabilityStrategy = new DefaultVulnerabilityStrategy();
        break;
    }
    
  }

  // ...
  // Método para comprobar si el jugador puede realizar una acción específica
  canPerformAction(action) {
    // Comprobar si el rol del jugador puede realizar la acción especificada
    const roleAction = this.actions[action];
    if (roleAction) {
      // Comprobar si el jugador ha alcanzado la frecuencia máxima para esta acción
      if (roleAction.times > 0) {
        return true;
      }
    }

    return false;
  }
  performAction(action) {
    // Comprobar si el jugador puede realizar la acción especificada
    if (this.canPerformAction(action)) {
      // Ejecutar la acción especificada utilizando el método executeAction de la clase Action
      const roleAction = this.actions[action.type];
      if (roleAction) {
        roleAction.executeAction(this);
      }
  
      // Actualizar la frecuencia de la acción para el jugador
      this.updateActionFrequency(action.type);
    }
  }
  // Método para comprobar si el jugador es vulnerable a un ataque
    isVulnerableToAttack() {
      // Utilizar la estrategia de vulnerabilidad asignada para determinar si el jugador es vulnerable a un ataque o no
      return this.vulnerabilityStrategy.isVulnerable(this);
    }
  
    // Método para matar al jugador
    die() {
      this.isAlive = false
    }
  }
  