// controllers/DataPlanController.js
import db from '../db/db.js';
import { errorHandler } from '../routes/errorHandler.js';

export async function createDataPlan(req, res) {
  try {
    // Extrae los detalles del plan de datos del cuerpo de la solicitud
    const { name, quota } = req.body;

    // Comprueba si el plan de datos ya existe en la base de datos
    let existingDataPlan = await db.DataPlan.findOne({ where: { name } });
    if (existingDataPlan) {
      return res.status(400).json({ error: 'El plan de datos ya existe' });
    }

    // Si el plan de datos no existe, créalo
    existingDataPlan = await db.DataPlan.create({ name, quota, dataUsed: 0 });

    // Envía el plan de datos creado como respuesta
    res.json(existingDataPlan);
  } catch (error) {
    console.error(`Error al crear el plan de datos ${name}:`, error);
    res.status(500).json({ error: 'Error al crear el plan de datos' });
  }
}
export const assignDataPlanToUser= errorHandler(async (req, res) => {
  try {
    // Extrae el ID del usuario y el nombre del plan de datos de los parámetros de la solicitud
    const { userId, dataPlanName } = req.params;

    // Busca al usuario y al plan de datos en la base de datos
    const user = await db.User.findByPk(userId);
    const dataPlan = await db.DataPlan.findOne({ where: { name: dataPlanName } });

    // Si el usuario o el plan de datos no existen, envía un error
    if (!user || !dataPlan) {
      return res.status(404).json({ error: 'Usuario o plan de datos no encontrado' });
    }

    // Asigna el plan de datos al usuario
    await user.setDataPlan(dataPlan);

    // Envía una respuesta exitosa
    res.json({ success: true });
  } catch (error) {
    console.error(`Error al asignar el plan de datos al usuario:`, error);
    res.status(500).json({ error: 'Error al asignar el plan de datos al usuario' });
  }
} )
export const getCurrentDataPlans = errorHandler(async (req, res) => {
    try {
      // Busca todos los planes de datos en la base de datos
      const dataPlans = await db.DataPlan.findAll();
  
      // Si no hay planes de datos, envía una respuesta vacía
      if (!dataPlans || dataPlans.length === 0) {
      return res.json({ message: 'No se encontraron planes de datos' });
    }
    
    // Envía todos los planes de datos como respuesta
      res.json(dataPlans);
    } catch (error) {
      console.error('Error al obtener todos los planes de datos:', error);
      res.status(500).json({ error: 'Error al obtener todos los planes de datos' });
    }
  }
)  


// Función para actualizar el plan de datos de un usuario
export const updateUserPlan = errorHandler(async (req, res) => {
  try {
    // Extraer el ID del usuario y los detalles del plan de datos de la solicitud
    const id = req.params.id;
    const { name, quota, dataUsed } = req.body;
   
    console.log(`id ${id},\n name: ${name},\n quota: ${quota} de tipo ${typeof(quota)},\n dataUsed: ${dataUsed} de tipo ${typeof(dataUsed)}`)
    // Buscar al usuario en la base de datos
    const user = await db.User.findByPk(id);

    // Si el usuario no existe, enviar un error
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Buscar si el usuario ya tiene un plan de datos o si existe un plan de datos con el mismo nombre
    let dataPlan = user.DataPlan || await db.DataPlan.findOne({ where: { name } });

    // Si no existe un plan de datos, crear uno nuevo
    if (!dataPlan) {
      dataPlan = await db.DataPlan.create({ name, quota, dataUsed });
    } else {
      // Si existe un plan de datos, actualizar sus propiedades y guardar los cambios
      dataPlan.name = name || dataPlan.name;
      dataPlan.quota = quota || dataPlan.quota;
      dataPlan.dataUsed = dataUsed || dataPlan.dataUsed;
      await dataPlan.save();
    }

    // await dataPlan.save();
    // Establecer el plan de datos del usuario
    await user.setDataPlan(dataPlan);

    // Enviar una respuesta exitosa
    //res.json({ success: true });
    // Enviar una respuesta al frontend
    res.json({ success: true });
  } catch (error) {
    // Registrar el error y enviar un mensaje de error al frontend
    console.error(`Error al actualizar el plan de datos del usuario:`, error);
    res.status(500).json({ error: 'Error al actualizar el plan de datos del usuario', message: error.message });
  }
});
    
   
