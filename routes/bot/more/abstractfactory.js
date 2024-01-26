// Definimos la clase abstracta Mueble
class Mueble {
    constructor(tipo, diseño) {
        this.tipo = tipo;
        this.diseño = diseño;
    }
}

// Definimos las clases concretas para cada tipo de mueble
class Silla extends Mueble {
    constructor(diseño) {
        super('silla', diseño);
    }
}

class Sofa extends Mueble {
    constructor(diseño) {
        super('sofá', diseño);
    }
}

class Mesa extends Mueble {
    constructor(diseño) {
        super('mesa', diseño);
    }
}

// Definimos la fábrica abstracta
class MuebleFactory {
    crearSilla() {}
    crearSofa() {}
    crearMesa() {}
}

// Definimos las fábricas concretas para cada diseño
class VictorianoFactory extends MuebleFactory {
    crearSilla() {
        return new Silla('victoriano');
    }
    crearSofa() {
        return new Sofa('victoriano');
    }
    crearMesa() {
        return new Mesa('victoriano');
    }
}

class ModernoFactory extends MuebleFactory {
    crearSilla() {
        return new Silla('moderno');
    }
    crearSofa() {
        return new Sofa('moderno');
    }
    crearMesa() {
        return new Mesa('moderno');
    }
}

// Ahora puedes crear muebles de diferentes tipos y diseños
let fabrica = new VictorianoFactory();
let sillaVictoriana = fabrica.crearSilla();
let sofaVictoriano = fabrica.crearSofa();

fabrica = new ModernoFactory();
let sillaModerna = fabrica.crearSilla();
let sofaModerno = fabrica.crearSofa();
