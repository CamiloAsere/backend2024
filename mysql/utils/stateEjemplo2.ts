//Ejercicio_2.ts: Sistema de gestión de pedidos en un restaurante
abstract class EstadoPedido {
    abstract actualizarEstado(): void;
}

class EnProceso extends EstadoPedido {
    actualizarEstado() {
        console.log('El pedido está en proceso. Si todos los platos están preparados, el estado del pedido cambiará a "Listo para entregar".');
    }
}

class ListoParaEntregar extends EstadoPedido {
    actualizarEstado() {
        console.log('El pedido está listo para entregar. Si se realiza la entrega, el estado del pedido cambiará a "Entregado".');
    }
}

class Entregado extends EstadoPedido {
    actualizarEstado() {
        console.log('El pedido ha sido entregado.');
    }
}

class Pedido {
    estado: EstadoPedido;

    constructor(estado: EstadoPedido) {
        this.estado = estado;
    }

    actualizarEstado() {
        this.estado.actualizarEstado();
    }
}
//Aquí te muestro cómo podría usar las clases que hemos definido 
let pedidoEnProceso = new Pedido(new EnProceso());
pedidoEnProceso.actualizarEstado();  // El pedido está en proceso. Si todos los platos están preparados, el estado del pedido cambiará a "Listo para entregar".

let pedidoListoParaEntregar = new Pedido(new ListoParaEntregar());
pedidoListoParaEntregar.actualizarEstado();  // El pedido está listo para entregar. Si se realiza la entrega, el estado del pedido cambiará a "Entregado".

let pedidoEntregado = new Pedido(new Entregado());
pedidoEntregado.actualizarEstado();  // El pedido ha sido entregado.
