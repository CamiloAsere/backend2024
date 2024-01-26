
import express from "express"
const app = express();
const port = 3000;

function hillClimbing(funcionObjetivo, vecino, x0) {
    let actual = x0;
    while (true) {
        let vecinos = vecino(actual);
        let siguiente = null;
        let siguienteValor = funcionObjetivo(actual);
        for (let i = 0; i < vecinos.length; i++) {
            let valor = funcionObjetivo(vecinos[i]);
            if (valor < siguienteValor) {
                siguienteValor = valor;
                siguiente = vecinos[i];
            }
        }
        if (siguiente === null) {
            return actual;
        }
        actual = siguiente;
    }
}
export const hClimb=(req,res)=>{
 // Aquí debes definir la función objetivo y la función vecino
 let funcionObjetivo = (x) => x^2;
 let vecino = (x) => [x-1, x+1];
 let x0 = 0;
 let resultado = hillClimbing(funcionObjetivo, vecino, x0);
 const end=Math.abs(resultado)
 console.log("El resultado es: ",(end))
 res.send(`
 <div>
 <h4>funcion objetivo: ${funcionObjetivo} /*{ <label>change data</label><input  />*/} </h4>
 <h4>vecino: ${vecino}</h4>
 <h1>resultado:<pre>${end}</pre></h1>
 </div>`);

}


app.get('/hill-climbing', hClimb);

app.listen(port, () => {
    console.log(`App lescuchando en el puerto http://localhost:${port}`);
});