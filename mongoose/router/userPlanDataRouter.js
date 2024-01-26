import express from 'express';
import { dataPlanController, userController } from '../controllers/controller2.js';
const userPlanDataRouter = express.Router();
userPlanDataRouter.get('/dataplan', dataPlanController.index);
userPlanDataRouter.post('/dataplan', dataPlanController.create);
userPlanDataRouter.get('/dataplan/:id', dataPlanController.show);
userPlanDataRouter.put('/dataplan/:id', dataPlanController.update);
userPlanDataRouter.delete('/dataplan/:id', dataPlanController.destroy);

userPlanDataRouter.get('/user', userController.index);
userPlanDataRouter.post('/user', userController.create);
userPlanDataRouter.get('/user/:id', userController.show);
userPlanDataRouter.put('/user/:id', userController.update);
userPlanDataRouter.delete('/user/:id', userController.destroy);

export default userPlanDataRouter;