import { express } from "../../start/app.js";
//import { getQuestions, createQuestion, deleteQuestion, updateQuestion } from './questionsController.js';
import { getQuestions, createQuestion, deleteQuestion, updateQuestion, getQuestionById } from './questionsController2.js';
const panelRouter = express.Router();
getQuestionById
panelRouter.get('/api/questions', getQuestions);
panelRouter.get('/api/questions/:id', getQuestionById);
panelRouter.post('/api/questions', createQuestion);
panelRouter.delete('/api/questions/:id', deleteQuestion);
panelRouter.put('/api/questions/:id', updateQuestion)


export default panelRouter;