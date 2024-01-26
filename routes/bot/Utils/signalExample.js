import printInColor from '../../st/color.js';
import { Signal } from './SIgnal2.js';
function signalColor(){

// Suscribirse a los cambios en la propiedad 'count'
const signal = new Signal({ count: 0 });

signal.subscribe('count', (newValue) => {
  console.log(printInColor(`Count`, 'red')+" has changed to"+printInColor(` ${newValue}`, 'yellow'));
});

signal.count = 1;
signal.count = 2;
  
}

export default signalColor;
