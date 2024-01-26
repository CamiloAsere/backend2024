import { Question } from "../../mongoose/models/Panel.js";
export const getQuestions = (req, res) => {
  Question.find()
    .then(questions => {
      console.log('Questions:', questions); // Log the questions
      res.json(questions);
    })
    .catch(error => res.status(500).json({ error }));
};
export const createQuestion = (req, res) => {
  const newQuestion = new Question(req.body);
  console.log("new question ",newQuestion)
  newQuestion.save()
    .then(question => res.status(201).json(question))
    .catch(error => {
      console.error(error);
      res.status(500).json({ error });
    });
};

export const deleteQuestion = (req, res) => {
  Question.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch(error => res.status(500).json({ error }));
};

export const updateQuestion = (req, res) => {
        const updatedQuestion = req.body;
      
        // Validar los datos del formulario
        if (!updatedQuestion.question || !updatedQuestion.correctAnswer) {
          res.status(400).json({ error: 'La pregunta y la respuesta correcta son obligatorias' });
          return;
        }
      
        Question.findByIdAndUpdate(req.params.id, updatedQuestion, { new: true })
          .then(question => res.json(question))
          .catch(error => res.status(500).json({ error }));
};
 