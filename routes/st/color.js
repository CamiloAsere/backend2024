export default function printInColor(text, color) {
    const colors = {
      red: '\x1b[31m',
      green: '\x1b[32m',
      yellow: '\x1b[33m',
      blue: '\x1b[34m',
      magenta: '\x1b[35m',
      cyan: '\x1b[36m',
      white: '\x1b[37m',
      crimson: '\x1b[38m',
      white_bold: '\x1b[39m',
      bright_red: '\x1b[91m'
    };
  
    return `${colors[color]}${text}\x1b[0m`;
  }
  /*
  // Uso de la función
  console.log(printInColor('Hola', 'red') + printInColor(', mundo!', 'green'));
  */