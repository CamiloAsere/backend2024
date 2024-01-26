// Definir una interfaz para las estrategias de vulnerabilidad
export class VulnerabilityStrategy {
    isVulnerable(player) {
      // Implementar lógica para determinar si el jugador es vulnerable a un ataque o no
      // ...
    }
  }
  
  // Definir una estrategia para los guardaespaldas
  export class BodyguardVulnerabilityStrategy extends VulnerabilityStrategy {
    isVulnerable(player) {
      // Los guardaespaldas no son vulnerables a los ataques
      return false;
    }
  }
  
  // Definir una estrategia para los hombres lobo
  export  class WerewolfVulnerabilityStrategy extends VulnerabilityStrategy {
    isVulnerable(player) {
      // Los hombres lobo transformados no son vulnerables a los ataques
      return player.status !== 'transformed';
    }
  }
  
  // Definir una estrategia por defecto para todos los demás jugadores
  export class DefaultVulnerabilityStrategy extends VulnerabilityStrategy {
    isVulnerable(player) {
      // Todos los demás jugadores son vulnerables a los ataques
      return true;
    }
  }