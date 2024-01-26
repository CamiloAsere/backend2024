import { Author } from "../models/Author.js";

async function createAuthor(name) {
  try {
    const existingAuthor = await Author.findOne({ name });
    if (existingAuthor) {
      console.log(`Ya existe un autor con el nombre ${name}`);
    } else {
      const newAuthor = new Author({ name });
      await newAuthor.save();
      console.log(`Se ha creado un nuevo autor con el nombre ${name}`);
    }
  } catch (err) {
    console.log(err);
  }
}
export default createAuthor;