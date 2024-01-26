import { MySignal } from "../public/js/Signal.js";

export const decreaseProductQuantity = async (product, t) => {
    try {
        // Crear una nueva instancia de MySignal para manejar el estado de la cantidad del producto
        const productQuantitySignal = new MySignal({ quantity: product.quantity });
    
        // Suscribirse a los cambios en la propiedad quantity
        productQuantitySignal.subscribe('quantity', (newValue) => {
            // Actualizar la cantidad del producto en la base de datos
            product.quantity = newValue;
            product.save({ transaction: t });
        });
    
        // Comprobar si la cantidad del producto es mayor que cero antes de disminuir
        if (product.quantity > 0) {
            // Disminuir la cantidad del producto en uno
            productQuantitySignal.quantity -= 1;
            return { success: true, message: 'Reservación creada con éxito.' };
        } else {
            return { success: false, message: 'El producto está agotado' };
        }
    } catch (error) {
        console.error(error);
        // Aquí puedes manejar el error como prefieras
        return { success: false, message: error.message  };
    }
};

/*
// Disminuir la cantidad del producto
const decreaseResult = await decreaseProductQuantity(product, t);

if (!decreaseResult.success) {
  throw new Error(decreaseResult.message);
}
*/