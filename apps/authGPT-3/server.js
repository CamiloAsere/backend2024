/*
Para implementar la autenticación utilizando Passport y Mongoose 
en el backend, primero debemos crear un servidor Node.js. 
Crea un archivo llamado server.js en la raíz del proyecto. 
Dentro de ese archivo, escribe el siguiente código:
*/

import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import { Strategy as LocalStrategy } from 'passport-local';
import router from './routes/auth.js'; 

// Initialize Express app
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/my-database', { useNewUrlParser: true });

// Configure Passport
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, done) => {



      // Implement Passport authentication logic


      
      // ...
    }
  )
);



//Implement Passport authentication logic:


//En el archivo server.js, puedes implementar la lógica de autenticación utilizando Passport de esta manera. Este ejemplo muestra la autenticación basada en correo electrónico y contraseña:
/*

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email', // Campo para el correo electrónico
      passwordField: 'password', // Campo para la contraseña
    },
    async (email, password, done) => {
      try {
        // Buscar el usuario por correo electrónico en la base de datos
        const user = await User.findOne({ email });


    // Si el usuario no existe o la contraseña es incorrecta
    if (!user || !(await user.matchPassword(password))) {
      return done(null, false, { message: 'Correo electrónico o contraseña incorrectos' });
    }

    // Si todo es correcto, devolver el usuario autenticado
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}

  )
);


En este ejemplo, puedes ver que cuando un usuario intenta autenticarse,
 primero se busca el usuario por correo electrónico en la base de datos. 
Luego, se comprueba si la contraseña coincide con la contraseña almacenada en la base de datos
utilizando el método de instancia matchPassword() que hemos definido en el modelo User. 
Si todo es correcto, se devuelve el usuario autenticado a Passport.

*/






passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // Implement user deserialization logic
  // ...
});
/*
Implement user deserialization logic:


Passport también requiere que implementes la lógica de serialización y deserialización de usuario. En este ejemplo, sólo necesitamos almacenar el ID del usuario en la sesión:


passport.serializeUser((user, done) => {
  done(null, user.id);
});


passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});


En este ejemplo, el método serializeUser() toma el objeto user y devuelve el ID del usuario.
 El método deserializeUser() toma el ID del usuario y lo busca en la base de datos 
 para devolver el objeto user.
*/
// Configure Express app
app.use(express.json());

app.use(
  session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Implement authentication routes
// ...


//Implement authentication routes:

// Rutas de autenticación

app.use('/api', router);
