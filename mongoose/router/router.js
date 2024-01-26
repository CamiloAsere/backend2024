import express from 'express';
import { authorsController, booksController } from '../controllers/controllers.js';

const router = express.Router();

router.get('/authors', authorsController.index);
router.get('/authors/:id', authorsController.show);
router.post('/authors', authorsController.create);
router.put('/authors/:id', authorsController.update);
router.delete('/authors/:id', authorsController.destroy);

router.get('/books', booksController.index);
router.get('/books/:id', booksController.show);
router.post('/books', booksController.create);
/*
router.put('/books/:id', booksController.update);
router.delete('/books/:id', booksController.destroy);
*/
export default router;