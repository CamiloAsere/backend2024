import bcryptjs from "bcryptjs";
import db from "../db/db.js";
import { errorHandler } from "../routes/errorHandler.js";
//import bcrypt from "bcryptjs/dist/bcrypt.js";
export const createUser = errorHandler(async (req, res) => {
    try {
        const { name, email, username, password, role } = req.body;

        // Validar los datos del usuario
        if (!name || !email || !username || !password || !role) {
            res.status(400).send({ message: 'Todos los campos son obligatorios.' });
            return;
        }
         // Validar el correo electrónico
         const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
         if (!emailRegex.test(email)) {
             res.status(400).render('register',{message: 'El correo electrónico no es válido.' });
             //res.status(400).send({ message: 'El correo electrónico no es válido.' });
             return;
         }
        // Comprobar si el correo electrónico ya existe
        const existingEmailUser = await db.User.findOne({ where: { email } });
        if (existingEmailUser) {
            //res.status(400).send({ message: 'El correo electrónico ya está en uso.' });
            res.status(400).render('register',{message: { message: 'El correo electrónico ya está en uso.' }});
            return;
        }
        // Comprobar si el nombre de usuario ya existe
        const existingUsernameUser = await db.User.findOne({ where: { username } });
        if (existingUsernameUser) {
            ///cambiar el render por send o json
            res.status(400).render('register', { message: 'El nombre de usuario ya está en uso.' });
            return;
        }
        // Hashear la contraseña
        const hashedPassword = await bcryptjs.hash(password, 10);
        const user = await db.User.create({ name, email, username, password: hashedPassword, role });
        res.status(201).send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Ocurrió un error al crear el usuario.' });
    }
} )
const userAttributes = ['id','name','username', 'email', 'role'];
const dataPlanAttributes = ['name', 'quota', 'dataUsed'];
export const getUsers = errorHandler(async (req, res) => {

    try {
        const users = await db.User.findAll({
            attributes: userAttributes,
            include: {
                model: db.DataPlan,
                attributes: dataPlanAttributes,
            }
        });

        if (users.length === 0) {
            res.status(204).send({ message: 'No se encontraron usuarios.' });
            return;
        }

        res.send(users);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message });
    }
 })
 
 export const getUser = errorHandler(async (req, res) => {
    try {
        const id = req.params.id;
        const user = await db.User.findByPk(id, {
            attributes: userAttributes,
            include: {
                model: db.DataPlan,
                attributes: dataPlanAttributes,
            }
        });
        
        if (!user) {
            res.status(404).send({ message: 'Usuario no encontrado.' });
            return;
        }

        res.send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Ocurrió un error al obtener el usuario.' });
    }
})
export const updateCustomUser = errorHandler(async (req, res) => {
    try {
        const id = req.params.id;
        const { name, email, username, password, role } = req.body;

        const user = await db.User.findByPk(id);
        if (!user) {
            res.status(404).send({ message: 'Usuario no encontrado.' });
            return;
        }

        let hashedPassword = user.password;
        if (password && password !== user.password) {
            hashedPassword = await bcryptjs.hash(password, 10);
        }

        const updatedFields = {};
        if (name) updatedFields.name = name;
        if (email) updatedFields.email = email;
        if (username) updatedFields.username = username;
        if (role) updatedFields.role = role;
        updatedFields.password = hashedPassword;

        await db.User.update(updatedFields, { where: { id: id } });

        res.send({ message: 'Usuario actualizado con éxito.' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Ocurrió un error al actualizar el usuario.' });
    }
})

export const deleteUser = errorHandler(async (req, res) => {
    try {
        const id = req.params.id;
        const user = await db.User.findByPk(id);
        if (!user) {
            res.status(404).send({ message: 'Usuario no encontrado.' });
            return;
        }
        await db.User.destroy({ where: { id: id } });
        console.log('Usuario eliminado con éxito.')
        res.send({ message: 'Usuario eliminado con éxito.' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Ocurrió un error al eliminar el usuario.' });
    }
})

/*
3. **getUsers**: Este controlador obtiene todos los usuarios y sus planes de datos asociados. Devuelve un array de objetos de usuario, donde cada objeto contiene el `username`, `email`, `role` del usuario y la información de su `DataPlan` asociado.

4. **getUser**: Este controlador obtiene un usuario específico y su plan de datos asociado. Devuelve un objeto de usuario que contiene el `username`, `email`, `role` del usuario y la información de su `DataPlan` asociado.
*/

/*
export const updateUser = errorHandler(async (req, res) => {
    try {
        const id = req.params.id;
        const { name, email, username, password, role } = req.body;

        const user = await db.User.findByPk(id);
        if (!user) {
            res.status(404).send({ message: 'Usuario no encontrado.' });
            return;
        }
        
        let hashedPassword = user.password;
        if (password !== user.password) {
            hashedPassword = await bcryptjs.hash(password, 10);
        }

        await db.User.update({ name, email, username, password: hashedPassword, role }, { where: { id: id } });
        
        res.send({ message: 'Usuario actualizado con éxito.' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Ocurrió un error al actualizar el usuario.' });
    }
})


*/

const updateUserFields = async (id, fields) => {
    const user = await db.User.findByPk(id);
    if (!user) {
      return { status: 404, message: 'Usuario no encontrado.' };
    }
  
    let hashedPassword = user.password;
    if (fields.password && fields.password !== user.password) {
      hashedPassword = await bcryptjs.hash(fields.password, 10);
    }
  
    const updatedFields = {};
    for (let key in fields) {
      if (fields[key]) updatedFields[key] = fields[key];
    }
    updatedFields.password = hashedPassword;
  
    await db.User.update(updatedFields, { where: { id: id } });
  
    return { status: 200, message: 'Usuario actualizado con éxito.' };
  };
  
  export const updateUser = errorHandler(async (req, res) => {
    try {
      const id = req.params.id;
      const { name, email, username, password, role } = req.body;
  
      const result = await updateUserFields(id, { name, email, username, password, role });
      res.status(result.status).send({ message: result.message });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Ocurrió un error al actualizar el usuario.' });
    }
  });
  
  export const updateCustomUserFields = errorHandler(async (req, res) => {
    try {
      const id = req.params.id;
      const { name, email, username, password, role } = req.body;
  
      const result = await updateUserFields(id, { name, email, username, password, role });
      res.status(result.status).send({ message: result.message });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Ocurrió un error al actualizar el usuario.' });
    }
  });
  