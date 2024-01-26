import { Question } from "../../mongoose/models/Panel.js";
export const getQuestions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;
    const searchTerm = req.query.searchTerm || '';

    // Fetch paginated list of questions
    const questions = await Question.find({ question: { $regex: searchTerm, $options: 'i' } }).skip(offset).limit(pageSize);

    // Count total number of items
    const totalItems = await Question.countDocuments({ question: { $regex: searchTerm, $options: 'i' } });

    // Return both questions and totalItems
    res.json({ questions, totalItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error al obtener las preguntas' });
  }
};
export const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      res.status(404).json({ error: 'No se encontró la pregunta' });
      return;
    }
    res.json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error al obtener la pregunta' });
  }
};
  export const createQuestion = async (req, res) => {
    try {
      const newQuestion = new Question(req.body);
  
      // Validar los datos del formulario
      if (!newQuestion.question) {
        res.status(400).json({ error: 'La pregunta es obligatoria' });
        return;
      }
      if (!newQuestion.correctAnswer || newQuestion.correctAnswer < 1 || newQuestion.correctAnswer > 4) {
        res.status(400).json({ error: 'La respuesta correcta debe ser un número entre 1 y 4' });
        return;
      }
  
      const question = await newQuestion.save();
      res.status(201).json(question);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocurrió un error al crear la pregunta' });
    }
  };
  export const deleteQuestion = async (req, res) => {
    try {
      await Question.findByIdAndDelete(req.params.id);
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocurrió un error al eliminar la pregunta' });
    }
  };
  export const updateQuestion = async (req, res) => {
    try {
      const updatedQuestion = req.body;
  
      // Validar los datos del formulario
      if (!updatedQuestion.question) {
        res.status(400).json({ error: 'La pregunta es obligatoria' });
        return;
      }
      if (!updatedQuestion.correctAnswer || updatedQuestion.correctAnswer < 1 || updatedQuestion.correctAnswer > 4) {
        res.status(400).json({ error: 'La respuesta correcta debe ser un número entre 1 y 4' });
        return;
      }
  
      const question = await Question.findByIdAndUpdate(req.params.id, updatedQuestion, { new: true });
      res.json(question);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocurrió un error al actualizar la pregunta' });
    }
  };