//usersRouter.js
import express from 'express';
import { loginUser } from '../controllers/Login.js';
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../controllers/usersController.js';
import { assignDataPlanToUser, createDataPlan, getCurrentDataPlans, updateUserPlan } from '../controllers/dataPlanController.js';
import { getAllDataPlans, getUserDataPlan } from '../controllers/getDataPlan.js';
const router = express.Router();

//ruta para el login
router.post('/app/login', loginUser)
//ruta para el register
router.post('/users/register', createUser)
//
router.get('/users',getUsers);
router.get('/users/:id', getUser );
router.delete('/users/:id', deleteUser);
router.put('/users/:id', updateUser);


// Rutas para los planes de datos
router.post('/dataPlans', createDataPlan);  // Crear un plan de datos

router.get('/data-plans', getAllDataPlans);
// Ruta para obtener el plan de datos de un usuario específico
router.get('/users/:userId/data-plan', getUserDataPlan);

router.get('/current-plans', getCurrentDataPlans);

router.post('/users/:userId/dataPlans/:dataPlanName', assignDataPlanToUser);  // Asignar un plan de datos a un usuario

//router.get('/users/:userId/dataPlan', updateUserPlan);
// actualizar plan de datos de un usuario en especifico
router.put('/users/:id/dataPlan', updateUserPlan);

export default router;