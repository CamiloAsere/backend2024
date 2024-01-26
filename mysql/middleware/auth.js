// middleware/auth.js
import jwt from 'jsonwebtoken';
import db from '../db/db.js';
// middleware/auth.js
export const verifyTokenAndRole = (roles) => {
    return async (req, res, next) => {
      try {
        // Verificar el token y obtener el id del usuario
        const token = req.cookies.token;
        const data = jwt.verify(token, 'tu_clave_secreta');
  
        // Buscar al usuario en la base de datos
        const user = await db.User.findOne({ where: { id: data.id } });
  
        // Si el usuario no tiene el rol requerido, enviar un error
        if (!roles.includes(user.role)) {
          //return res.status(403).json({ message: 'Acceso denegado' });
          return res.status(403).render('error',{ message: 'Acceso denegado' });
        }
  
        // Si el usuario tiene el rol requerido, continuar con la siguiente función en la cadena
        next();
      } catch (error) {
        // Redirigir al usuario a la página de inicio de sesión en caso de error
        res.redirect('/login');
      }
    };
  };
  
export const verifyToken = (req, res, next) => {
    const token = req.cookies?.token;
  
    if (!token) {
      return res.redirect('/login');
    }
  //console.log("token en auth.js ",token)
    try {
      const verified = jwt.verify(token, 'tu_clave_secreta');
      req.user = verified.id;
      next();
    } catch (error) {
      // Redirigir al usuario a la página de inicio de sesión en caso de error
      res.redirect('/login');
    }
  };
  