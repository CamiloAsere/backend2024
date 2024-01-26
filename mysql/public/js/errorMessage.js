import { MySignal } from "../../../routes/bot/Utils/Signal";
import { errorMessageElement } from "./reserveProduct";
// Crear una nueva instancia de MySignal para manejar el estado del mensaje de error
export const errorMessageSignal = new MySignal({ errorMessage: '' });

// Suscribirse a los cambios en la propiedad errorMessage
errorMessageSignal.subscribe('errorMessage', (newValue) => {
  // Actualizar el elemento del mensaje de error con el nuevo valor
  errorMessageElement.textContent = newValue;
});