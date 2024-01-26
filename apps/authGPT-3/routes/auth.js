
//En este ejemplo, hemos creado un archivo auth.js en la carpeta routes que contiene 
//las siguientes rutas:


import passport from "passport"
import { Router } from "express";
const router =Router()
import {login, signup} from '../services/auth.js'
//const { login, signup } = import('../services/auth');


// Inicio de sesión
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(200).json({ user: req.user });
});


// Registro
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await signup(name, email, password);
    req.login(user, (err) => {
      if (err) return res.status(500).json({ error: err });
      return res.status(201).json({ user });
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});


// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});


export default router


//En este archivo, hemos definido tres rutas:



//login: Esta ruta toma un correo electrónico y una contraseña y autentica al usuario utilizando Passport. Si la autenticación es exitosa, devuelve el usuario como respuesta.

//signup: Esta ruta toma un nombre de usuario, correo electrónico y una contraseña. Crea un nuevo usuario y lo guarda en la base de datos. Si la creación es exitosa, autentica al usuario utilizando Passport y lo devuelve como respuesta.

//logout: Esta ruta cierra la sesión del usuario.
