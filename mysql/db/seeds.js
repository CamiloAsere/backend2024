// seeds.js
import Product from './models/Product.js';
import User from './models/User.js';

const users = [
  { name: 'Usuario de prueba 7', username: "@comprador1", email: 'buytest.two@example.com', password: 'buy1', role: 'user' },
  { name: 'Usuario de prueba 9', username: "@comprador2", email: 'buytest.three@example.com', password: 'buy2', role: 'user' },
  
  // puedes agregar más usuarios aquí
];



async function seedDatabase() {
  
  for (const user of users) {
    // Comprobar si el usuario ya existe en la base de datos
    let existingUser = await User.findOne({ where: { email: user.email } });
    if (!existingUser) {
      // Si el usuario no existe, crearlo
      existingUser = await User.create(user);
    }
    console.log(`Usuario ${existingUser.name} creado con ID ${existingUser.id}`);
  }

const products = [
  { name: 'Básico', price: 10, quantity: 10 , description:'Álbum 10 fotos . 8" x 12"' , imageUrl: "" },
  { name: 'Estandar', price: 15, quantity: 20 , description:'Album 15 f.8" x 12"\n 1 ampliacion 12"x18' , imageUrl: "" },
  { name: 'Premium', price: 20, quantity: 20 , description:'Album 20 f.8" x 12"\n 1 ampliacion 12"x18\n FotoBoook 20f.8 x 12"' ,imageUrl:"" },
  // puedes agregar más productos aquí
];
  for (const product of products) {
    // Comprobar si el producto ya existe en la base de datos
    const existingProduct = await Product.findOne({ where: { name: product.name } });
    if (!existingProduct) {
      // Si el producto no existe, crearlo
      await Product.create(product);
    }
  }
}

export default seedDatabase;


