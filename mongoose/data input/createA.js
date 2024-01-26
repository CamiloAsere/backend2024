import mongoose from "mongoose";
import { Author } from "../models/Author.js";
import { Question } from "../models/Panel.js";

const authors = [
  { name: 'Author 1' },
  { name: 'Author 2' },
  { name: 'Juan' },
  { name: 'George' },
];

async function createAuthors() {
  /*
  if (mongoose.connection.readyState !== 1) {
    console.error('La conexión a la base de datos IA no está lista');
    return;
  }
  */
  try {
    for (const author of authors) {
      const existingAuthor = await Author.findOne({ name: author.name });
      if (existingAuthor) {
        console.log(`Ya existe un autor con el nombre ${author.name}`);
      } else {
        const newAuthor = new Author(author);
        await newAuthor.save();
        console.log(`Se ha creado un nuevo autor con el nombre ${author.name}`);
      }
    }
    
  } catch (err) {
    console.error('Error creando autores:', err);
  }
}

 

export default createAuthors;
