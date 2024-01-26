//Ejercicio_1.ts: Sistema de gestión de cuentas bancarias
abstract class EstadoCuenta {
    abstract realizarTransaccion(monto: number): void;
}

class Activa extends EstadoCuenta {
    realizarTransaccion(monto: number) {
        console.log(`Transacción realizada. Saldo actualizado en ${monto}.`);
    }
}

class Bloqueada extends EstadoCuenta {
    realizarTransaccion(monto: number) {
        console.log('La cuenta está bloqueada. La transacción no se puede realizar.');
    }
}

class Cerrada extends EstadoCuenta {
    realizarTransaccion(monto: number) {
        console.log('La cuenta está cerrada. La transacción no se puede realizar.');
    }
}

class CuentaBancaria {
    estado: EstadoCuenta;

    constructor(estado: EstadoCuenta) {
        this.estado = estado;
    }

    realizarTransaccion(monto: number) {
        this.estado.realizarTransaccion(monto);
    }
}
//Aquí te muestro cómo podría usar las clases que hemos definido 
let cuentaActiva = new CuentaBancaria(new Activa());
cuentaActiva.realizarTransaccion(100);  // Transacción realizada. Saldo actualizado en 100.

let cuentaBloqueada = new CuentaBancaria(new Bloqueada());
cuentaBloqueada.realizarTransaccion(100);  // La cuenta está bloqueada. La transacción no se puede realizar.

let cuentaCerrada = new CuentaBancaria(new Cerrada());
cuentaCerrada.realizarTransaccion(100);  // La cuenta está cerrada. La transacción no se puede realizar.
