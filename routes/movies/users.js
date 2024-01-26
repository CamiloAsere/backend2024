import { express } from "../../start/app.js";
const Router=express.Router;
const usersRouter = new Router();

usersRouter.get("/", async (req, res) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  res.json(data);
});

export default usersRouter;
