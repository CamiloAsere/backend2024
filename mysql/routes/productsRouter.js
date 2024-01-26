//productsRouter.js
import express from 'express';
import { getProducts, createProduct, updateProduct, deleteProduct, getProductDetails, getAdminView, showProductsView } from '../controllers/productsController.js';
import { createReservation, deleteReservation, getReservationById, getReservations, updateReservation } from '../controllers/reservationController.js';
const router = express.Router();
import { verifyToken, verifyTokenAndRole } from '../middleware/auth.js';
import { loginUser, renderRegisterView } from '../controllers/Login.js';
import jwt from 'jsonwebtoken';
import { createUser } from '../controllers/usersController.js';
router.get('/index', showProductsView);
router.get('/menu', (req,res)=>{
    res.render("menu")
});
router.get('/login', (req, res) => {
    const token = req.cookies.token;
    if (token) {
      try {
        jwt.verify(token, 'tu_clave_secreta');
        return res.redirect('/index');
      } catch (error) {
      }
    }
    // Si no, renderizar la vista de login, pasando el mensaje de error si existe
    res.render('login', { message: req.query.message });;
  });
  router.post('/login', loginUser);
  router.get('/register', renderRegisterView )
  router.post('/register', createUser)
// Ruta de cierre de sesión
router.post('/logout', verifyToken, (req, res) => {
    // Eliminar las cookies del navegador del usuario
    res.clearCookie('token');
    res.clearCookie('user');
    res.redirect('/index');
  });
  




// Rutas para la vista de productos
router.get('/products', getProducts);
router.post('/products', createProduct);
router.get('/productDetails/:id',verifyTokenAndRole(['user']), getProductDetails);
// Rutas para la vista de administración
router.post('/admin/deleteProduct/:id', deleteProduct);
router.post('/admin/addProduct', createProduct);
router.post('/admin/updateProduct/:id', updateProduct);

router.get('/admin',verifyTokenAndRole(['admin']), getAdminView);
// Rutas para las reservaciones
router.get('/admin/reservations',verifyTokenAndRole(['admin']), getReservations); // Obtener todas las reservaciones
router.get('/admin/reservations/:id',verifyTokenAndRole(['admin']), getReservationById); 
router.post('/admin/reservations',verifyTokenAndRole(['admin']), createReservation); // Crear una nueva reservación
router.put('/admin/updateReservation/:id', updateReservation); // Actualizar una reservación existente
router.delete('/admin/reservations/:id', deleteReservation); // Eliminar una reservación


/*
router.get('/testadmin', verifyTokenAndRole(['admin']), (req, res) => {
  res.send('Esta es la ruta 1');
});

router.get('/testuser', verifyTokenAndRole(['user']), (req, res) => {
  res.send('Esta es la ruta 2');
});
*/
export default router;




  