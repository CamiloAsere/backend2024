import mongoose from "mongoose";
import { Question } from "../models/Panel.js";
import { DEFAULT_QUESTIONS } from "./questions.js";

async function createQuestions() {
    /*
    if (mongoose.connection.readyState !== 1) {
      console.error('La conexión a la base de datos IQ no está lista');
      return;
    }
    */
    
    try {
      for (const question of DEFAULT_QUESTIONS) {
        const existingQuestion = await Question.findOne({ question: question.question });
        if (existingQuestion) {
          console.log(`Ya existe una pregunta con el texto ${question.question}`);
        } else {
          const newQuestion = new Question(question);
          await newQuestion.save();
          console.log(`Se ha creado una nueva pregunta con el texto ${question.question}`);
        }
      }
    } catch (err) {
      console.error('Error creando preguntas:', err);
    }
  }
  export default createQuestions;
  /*
  Sí, la función `createQuestions()` es similar a `Question.insertMany()` en el sentido de que 
  ambas pueden crear múltiples documentos en la base de datos a partir de un array. Sin embargo, 
  hay una diferencia importante:

- `createQuestions()`: Esta función recorre el array y crea una nueva pregunta para cada objeto
 del array **solo si no existe ya una pregunta con el mismo texto en la base de datos**.
  Esto significa que no se crearán preguntas duplicadas.

- `Question.insertMany()`: Este método de Mongoose inserta directamente todos los documentos 
del array en la base de datos, sin comprobar si ya existen documentos con los mismos datos. 
Esto podría resultar en la creación de documentos duplicados.

Por lo tanto, aunque ambas funciones pueden crear múltiples documentos, `createQuestions()` 
tiene una comprobación adicional para evitar duplicados. 😊

Question.insertMany(DEFAULT_QUESTIONS);
console.log('Preguntas por defecto insertadas con éxito');
  */

  