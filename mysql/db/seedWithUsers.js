// seeds.js
import { User } from './models/User.js';
import bcrypt from 'bcryptjs';

const users = [
  { name: 'Usuario de prueba 1', email: 'test1@example.com', password: 'password1', role: 'user' },
  { name: 'Usuario de prueba 2', email: 'test2@example.com', password: 'password2', role: 'admin' },
  // puedes agregar más usuarios aquí
];

async function seedDatabase() {
  for (const user of users) {
    // Comprobar si el usuario ya existe en la base de datos
    let existingUser = await User.findOne({ where: { email: user.email } });
    if (!existingUser) {
      // Si el usuario no existe, crearlo
      const hashedPassword = await bcrypt.hash(user.password, 10);
      existingUser = await User.create({ ...user, password: hashedPassword });
    }
    console.log(`Usuario ${existingUser.name} creado con ID ${existingUser.id}`);
  }
}
