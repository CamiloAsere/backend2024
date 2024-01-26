// controllers/userController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../db/models/User.js';
import { errorHandler } from '../routes/errorHandler.js';
export const renderRegisterView = async (req, res) => {
  try {
      res.render("register",{ message:"" });
  } catch (error) {
      console.log(error)
      res.locals.error = "Hubo un error al obtener la vista.";
      res.render("<h1>no se encontro nada <h1>");
  }
};
export const loginUser = errorHandler(async (req, res) => {
  const { username, password } = req.body;
//console.log("username ",username)
  try {
    // Buscar al usuario en la base de datos
    const user = await User.findOne({ where: { username } });

    // Si el usuario no existe, enviar un error
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // Comprobar si la contraseña proporcionada coincide con la contraseña almacenada
    const isMatch = await bcrypt.compare(password, user.password);

    // Si las contraseñas no coinciden, enviar un error
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Si las contraseñas coinciden, generar un token de acceso
    const token = jwt.sign({ id: user.id }, 'tu_clave_secreta');
/*
    // Enviar el token y los datos del usuario como respuesta
    res.json({ token, user }); //frontend con react.js

    */
    // Establecer el token y los datos del usuario como cookies
    res.cookie('token', token, { httpOnly: true });
    res.cookie('user', JSON.stringify(user), { httpOnly: true });

    // Redirigir al usuario a la página de productos
    res.redirect('/products');
  } catch (error) {
    // Si ocurre un error, enviar el error como respuesta
    console.error('Ocurrió un error:', error);
    //res.status(500).json({ message: error.message });
     res.status(400).render('lregister', { message: error.message });
  
    
  }
} )
