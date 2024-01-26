// reservationController.js
import Reservation from '../db/models/Reservation.js';
import User from '../db/models/User.js';
import Product from '../db/models/Product.js';
import sequelize from '../db/sequelize.js';
import { decreaseProductQuantity } from '../utils/decreaseQuantity.js';
import { errorHandler } from '../routes/errorHandler.js';

// Controlador para obtener todas las reservaciones
export const getReservations = async (req, res) => {
  const reservations = await Reservation.findAll();
  res.render('reservations', { reservations });
};

// Controlador para crear una reservación
export const createReservation = errorHandler(async (req, res) => {
  const { userId, productId, date } = req.body;
  console.log('req.body en createReservation ',req.body)
  //console.log(`userId, productId en req.body ',${userId}, ${productId}`)
  if (!productId || !userId) {
    throw new Error('Falta el ID del producto o del usuario');
  }
  try {
    const result = await sequelize.transaction(async (t) => {
      
      const user = await User.findByPk(userId, { transaction: t });
      // console.log(`user en reservations ${user}`)
      const product = await Product.findByPk(productId, { transaction: t });
      //console.log(`productId en reservations  ${product}`)
      // Comprobar si el usuario y el producto existen
    if (!user || !product) {
    throw new Error('El usuario o el producto no existen');
}
       // Disminuir la cantidad del producto
       const decreaseResult = await decreaseProductQuantity(product, t);

       if (!decreaseResult.success) {
         throw new Error(decreaseResult.message);
       }
      // console.log(`userID, productId en transaction ',${user.id}, ${product.id}`)
      const reservation = await Reservation.create({
        UserId: user.id,
        ProductId: product.id,
        date: date
      }, { transaction: t });
      console.log("reservation.ID", reservation.id)
      
      return { reservation, message: decreaseResult.message };

    });

    // Si la transacción se ha realizado correctamente, `result` es la reserva creada
    res.json({ message: result.message , reservation: result.reservation });
    //console.log("result.reservation ",result.reservation)
    //res.redirect('/admin/reservations');

  } catch (error) {
    // Si ha habido un error, la transacción se ha revertido y se maneja el error
    console.error('Ocurrió un error:', error);
    res.status(500).json({ message: error.message });
  }

})
export const getReservationById = errorHandler(async (req, res) => {
  try {
    // Obtiene el ID de la reservación de los parámetros de la ruta
    const { id } = req.params;

    // Busca la reservación en la base de datos
    const reservation = await Reservation.findByPk(id);

    // Si la reservación no existe, envía un error
    if (!reservation) {
      return res.status(404).json({ message: 'Reservación no encontrada' });
    }

    // Si la reservación existe, envía la reservación como respuesta
    res.json(reservation);
  } catch (error) {
    // Si ocurre un error, envía un mensaje de error
    console.error(error);
    res.status(500).json({ message: 'Ocurrió un error al obtener la reservación' });
  }
}) 
// Controlador para actualizar una reservación
export const updateReservation = async (req, res) => {
  const { userId, productId, date } = req.body;
  const reservation = await Reservation.findByPk(req.params.id);
  if (!reservation) {
    res.status(404).json({ message: 'Reservación no encontrada' });
  } else {
    await Reservation.update({ userId, productId, date }, { where: { id: req.params.id } });
    res.redirect('/admin/reservations');
  }
};


// Controlador para eliminar una reservación
export const deleteReservation  = errorHandler(async (req, res) => {
  console.log("delete start")
  try {
    const reservation = await Reservation.findByPk(req.params.id);
    if (!reservation) {
      res.status(404).json({ message: 'Reservación no encontrada' });
    } else {
      await Reservation.destroy({ where: { id: req.params.id } });
      console.log("Reservacion eliminada")
      res.redirect('/admin/reservations');
    }
  } catch (error) {
    console.error('Ocurrió un error al eliminar la reservación:', error);
    res.status(500).json({ message: 'Ocurrió un error al eliminar la reservación' });
  }
}
)


