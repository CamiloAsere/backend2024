// Definimos la clase abstracta Role
class Role {
    constructor(tipo) {
        this.tipo = tipo;
    }
}

// Definimos las clases concretas para cada subtipo de Wolf
class AlphaWolf extends Role {
    constructor() {
        super('AlphaWolf');
    }
}

class BetaWolf extends Role {
    constructor() {
        super('BetaWolf');
    }
}

class OmegaWolf extends Role {
    constructor() {
        super('OmegaWolf');
    }
}

// Definimos las clases concretas para cada subtipo de Aldea
class Aldeano extends Role {
    constructor() {
        super('Aldeano');
    }
}

class Vidente extends Role {
    constructor() {
        super('Vidente');
    }
}

class Cazador extends Role {
    constructor() {
        super('Cazador');
    }
}

// Definimos las fábricas abstractas
class RoleFactory {
    crearRol(subtipo) {}
}

// Definimos las fábricas concretas para cada subtipo de Wolf
class WolfFactory extends RoleFactory {
    crearAlphaWolf() {
        return new AlphaWolf();
    }
    crearBetaWolf() {
        return new BetaWolf();
    }
    crearOmegaWolf() {
        return new OmegaWolf();
    }
}

// Definimos las fábricas concretas para cada subtipo de Aldea
class AldeaFactory extends RoleFactory {
    crearAldeano() {
        return new Aldeano();
    }
    crearVidente() {
        return new Vidente();
    }
    crearCazador() {
        return new Cazador();
    }
}

// Definimos la clase Player
export class Player {
    constructor( name, id, game, role ) {
        this.name = name;
        this.id = id;
        this.isAlive = true;
        this.game = game;
        this.role = role;
        this.role.tipo
    }
    // ...
    // El resto de tu código de Player.js va aquí
}
// Crear las fábricas
let wolfFactory = new WolfFactory();
let aldeaFactory = new AldeaFactory();

// Crear roles de Wolf
let alphaWolf = wolfFactory.crearAlphaWolf();
let betaWolf = wolfFactory.crearBetaWolf();
let omegaWolf = wolfFactory.crearOmegaWolf();

// Crear roles de Aldea
let aldeano = aldeaFactory.crearAldeano();
let vidente = aldeaFactory.crearVidente();
let cazador = aldeaFactory.crearCazador();

// Crear jugadores y asignarles roles
let jugador1 = new Player('Jugador 1', 1, 'Juego 1', alphaWolf);
let jugador2 = new Player('Jugador 2', 2, 'Juego 1', betaWolf);
let jugador3 = new Player('Jugador 3', 3, 'Juego 1', omegaWolf);
let jugador4 = new Player('Jugador 4', 4, 'Juego 1', aldeano);
let jugador5 = new Player('Jugador 5', 5, 'Juego 1', vidente);
let jugador6 = new Player('Jugador 6', 6, 'Juego 1', cazador);

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
 export const nothing='nada'