// seeds.js
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import DataPlan from './models/DataPlan.js';
const users = [
  { name: 'Usuario de prueba 1', username: "@user1", email: 'test.one@example.com', password: 'password1', role: 'user' },
  { name: 'Usuario de prueba 2', username: "@user2", email: 'test.two@example.com', password: 'password2', role: 'user' },
  { name: 'Usuario de prueba 3', username: "@admin", email: 'test.three@example.com', password: 'admin123', role: 'admin' },
  // puedes agregar más usuarios aquí
];

const dataPlans = [
  { name: 'Plan de prueba 1', quota: 1000, dataUsed: 500 },
  { name: 'Plan de prueba 2', quota: 2000, dataUsed: 1000 },
  { name: 'Plan de prueba 3', quota: 1800, dataUsed: 700 },
  // puedes agregar más planes de datos aquí
];
async function seedDB() {
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const dataPlan = dataPlans[i];

    try {
      // Comprobar si el usuario ya existe en la base de datos
      let existingUser = await User.findOne({ where: { email: user.email } });
      if (!existingUser) {
        // Si el usuario no existe, crearlo
        const hashedPassword = await bcrypt.hash(user.password, 10);
        existingUser = await User.create({ ...user, password: hashedPassword });
      }

      // Comprobar si el plan de datos ya existe en la base de datos
      let existingDataPlan = await DataPlan.findOne({ where: { name: dataPlan.name } });
      if (!existingDataPlan) {
        // Si el plan de datos no existe, crearlo
        existingDataPlan = await DataPlan.create(dataPlan);
      }

      // Asociar el plan de datos con el usuario
      await existingUser.setDataPlan(existingDataPlan);

      console.log(`Usuario ${existingUser.name} creado con ID ${existingUser.id}`);
    } catch (error) {
      console.error(`Error al crear el usuario ${user.name}:`, error);
      throw error;  // Detiene la ejecución si ocurre un error
    }
  }
}

export default seedDB;
/*
async function seedDB() {
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const dataPlan = dataPlans[i];

    // Comprobar si el usuario ya existe en la base de datos
    let existingUser = await User.findOne({ where: { email: user.email } });
    if (!existingUser) {
      // Si el usuario no existe, crearlo
      const hashedPassword = await bcrypt.hash(user.password, 10);
      existingUser = await User.create({ ...user, password: hashedPassword });

      // Crear un plan de datos para el usuario
      const createdDataPlan = await DataPlan.create(dataPlan);

      // Asociar el plan de datos con el usuario
      await existingUser.setDataPlan(createdDataPlan);
    }

    console.log(`Usuario ${existingUser.name} creado con ID ${existingUser.id}`);
  }
}
*/

/*
ste código creará un User y un DataPlan para cada entrada en tus arrays users y dataPlans,
 respectivamente, y luego asociará cada DataPlan con el User correspondiente.Asegúrate de 
 tener la misma cantidad de usuarios y planes de datos en tus arrays users y dataPlans, respectivamente.
 */