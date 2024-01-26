import express from 'express';
import {config} from "dotenv"
import printInColor from '../routes/st/color.js';
const app = express();
export class StartApp {
  constructor() {
    this.app = app;
    
  }

  start(port) {
    this.app.listen(port, () => {
      console.log(printInColor('~~Felicidades!!','yellow' ) + printInColor('Esta app se escucha por el puerto ','blue') + printInColor(`${port}`,'red') );
    });
  }
}


export {app, express,config }
