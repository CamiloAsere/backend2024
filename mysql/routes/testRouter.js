//reservationsRouter.js
import express from 'express';
import { TestProductsView, formatDatabase, showProductsView } from '../controllers/productsController.js';
const router = express.Router();

//test route
router.get('/test', TestProductsView);

// Formatear DB
router.get('/format-database', formatDatabase);
export default router; 