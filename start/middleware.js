// middleware.js
import cors from 'cors';
import { express } from './app.js';
import errorMiddleware from '../mongoose/controllers/errorMiddleware.js';
export const configureMiddleware = (app) => {
  // Configure middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // Serve static files from the 'public' directory
  app.use(express.static('public'));
  app.use(errorMiddleware);
};