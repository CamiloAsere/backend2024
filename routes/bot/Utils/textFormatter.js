export class MyTextFormatter {
    constructor(text, width) {
        this.text = text;
        this.width = width;
    }

    format() {
        if (this.text.length > this.width) {
            return this.text.substring(0, this.width - 3) + '...'; // Trunca el texto y agrega '...' si es más largo que el ancho
        } else {
            return this.text.padEnd(this.width, ' '); // Rellena con espacios si el texto es más corto que el ancho
        }
    }
}
/*
// Uso de la clase
const formatter = new MyTextFormatter('Nombre del jugador', 5);
const formattedText = formatter.format();
console.log(formattedText);
*/