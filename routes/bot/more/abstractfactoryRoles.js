import { countWolfVotes } from "../bot actions/countWolvesVote.js";
import { roles } from "../bot actions/roles.js";

// Definimos la clase abstracta Role
class Role {
    constructor(tipo) {
        this.tipo = tipo;
        this.canVote=true
    }
}
// Definimos las clases concretas para cada tipo de rol
export class Wolf extends Role {
    constructor(subtipo) {
        super('Wolf');
        Object.assign(this, roles.wolf());
        this.subtipo = subtipo;

    }
    countWolfVotes(game, roles, bot) {
        // Llamar a la función countWolfVotes y pasar los argumentos necesarios
        countWolfVotes(game, roles, bot);
      }
}

class Village extends Role {
    constructor(subtipo) {
        super('Village');
        this.subtipo = subtipo;
    }


}

// Definimos las fábricas abstractas
class RoleFactory {
    crearRol(subtipo) {}
}

// Definimos las clases concretas para cada subtipo de Wolf
class AlphaWolf extends Wolf {
    constructor() {
        super('Wolf');
        this.subtipo = 'Alpha';
    }
}

class BetaWolf extends Wolf {
    constructor() {
        super('Wolf');
        this.subtipo = 'BetaWolf';
    }
}

class OmegaWolf extends Wolf {
    constructor() {
        super('Wolf');
        this.subtipo = 'OmegaWolf';
    }
}

// Definimos las clases concretas para cada subtipo de Aldea
class Villager extends Village {
    constructor() {
        super('Village');
        Object.assign(this, roles.villager());
        this.subtipo = roles.villager().roleName;
    }
}

class Seer extends  Village {
    constructor() {
        super('Village');
        Object.assign(this, roles.seer());
        this.subtipo = roles.seer().roleName;
    }
}

class Hunter extends  Village {
    constructor() {
        super('Village');
        Object.assign(this, roles.hunter());
        this.subtipo = roles.hunter().roleName;
    }
}


// Definimos las fábricas concretas para cada subtipo de Wolf
class WolfFactory extends RoleFactory {
    crearRol(subtipo) {
        switch (subtipo) {
            case 'Alpha':
                return new AlphaWolf();
            case 'Beta':
                return new BetaWolf();
            case 'Omega':
                return new OmegaWolf();
            default:
                throw new Error(`Subtipo de Wolf no reconocido: ${subtipo}`);
        }
    }
}


// Definimos las fábricas concretas para cada subtipo de Aldea
class AldeaFactory extends RoleFactory {
    crearRol(subtipo) {
        switch (subtipo) {
            case 'Aldeano':
                return new Villager();
            case 'Vidente':
                return new Seer();
            case 'Cazador':
                return new Hunter();
            default:
                throw new Error(`Subtipo de Aldea no reconocido: ${subtipo}`);
        }
    }
}

// Definimos la clase Player
export class Player {
    constructor( name, id, game, role ) {
        this.name = name;
        this.id = id;
        this.isAlive = true;
        this.game = game;
        this.role =  role;
    }
    // ...
    // El resto de tu código de Player.js va aquí
}
// Crear las fábricas
let wolfFactory = new WolfFactory();
let aldeaFactory = new AldeaFactory();
let wolf =new Wolf()
// Crear roles de Wolf
let alphaWolf = wolfFactory.crearRol('Alpha');
let betaWolf = wolfFactory.crearRol('Beta');
let omegaWolf = wolfFactory.crearRol('Omega');

// Crear roles de Aldea
let aldeano = aldeaFactory.crearRol('Aldeano');
let vidente = aldeaFactory.crearRol('Vidente');
let cazador = aldeaFactory.crearRol('Cazador');

// Crear jugadores y asignarles roles
let jugador1 = new Player('Jugador 1', 1, 'Juego 1', alphaWolf);
let jugador2 = new Player('Jugador 2', 2, 'Juego 1', betaWolf);
let jugador3 = new Player('Jugador 3', 3, 'Juego 1', omegaWolf);
let jugador4 = new Player('Jugador 4', 4, 'Juego 1', aldeano);
let jugador5 = new Player('Jugador 5', 5, 'Juego 1', vidente);
let jugador6 = new Player('Jugador 6', 6, 'Juego 1', cazador);
let jugador7 = new Player('Jugador 7', 6, 'Juego 1', wolf);
/*
En este código, primero creamos las fábricas WolfFactory y AldeaFactory. Luego, utilizamos estas fábricas
para crear los roles AlphaWolf, BetaWolf, OmegaWolf, Aldeano, Vidente y Cazador. Finalmente,
creamos los jugadores y les asignamos los roles creados.
*/

console.log(`${jugador1.name} es un ${jugador1.role.tipo} de subtipo ${jugador1.role.subtipo}`);
console.log(`${jugador2.name} es un ${jugador2.role.tipo} de subtipo ${jugador2.role.subtipo}`);
console.log(`${jugador3.name} es un ${jugador3.role.tipo} de subtipo ${jugador3.role.subtipo}`);
console.log(`${jugador4.name} es un ${jugador4.role.tipo} de subtipo ${jugador4.role.subtipo}`);
console.log(`${jugador5.name} es un ${jugador5.role.tipo} de subtipo ${jugador5.role.subtipo}`);
console.log(`${jugador6.name} es un ${jugador6.role.tipo} de subtipo ${jugador6.role.subtipo}`);
console.log(`${jugador7.name} es un ${jugador7.role.tipo} de subtipo ${jugador7.role.emoji}`);
 export const nothing='nada'