import { express } from "../../start/app.js";
import { generateImage } from "./openai_config.js";
const {Router} =express
const openaiRouter =new Router();
openaiRouter.post('/openai', generateImage);
export default openaiRouter;