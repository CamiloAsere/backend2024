//productsController.js
import db from '../db/db.js';
import Product from '../db/models/Product.js';
import Reservation from '../db/models/Reservation.js';
// Controlador para obtener los productos
export const getProducts = async (req, res) => {
  const products = await Product.findAll();
  res.render('products', { products , user: req.cookies.token });
};
// Controlador para obtener los detalles de un producto
export const getProductDetails = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  res.render('productDetails', { product });
};

// Controlador para mostrar el formulario de agregar producto
export const showProductsView= async (req, res) => {
  const products = await Product.findAll();
  res.render('sayra',{ products , user: req.cookies.user });
};
export const TestProductsView= async (req, res) => {
  const products = await Product.findAll();
  res.render('test',{ products , user: req.cookies.user });
};

// Controlador para crear un producto
export const createProduct = async (req, res) => {
  const { name, price, quantity, description, imageUrl } = req.body; // Agrega imageUrl aquí
  await Product.create({ name, price, quantity, description, imageUrl }); // Y aquí
  res.redirect('/admin');
};

// Controlador para obtener la vista de administración
export const getAdminView = async (req, res) => {
  const products = await Product.findAll();
  let productToEdit = null;
  if (req.params.id) {
    productToEdit = await Product.findByPk(req.params.id);
  }
  res.render('admin', { products, productToEdit });
};

// Controlador para actualizar un producto
export const updateProduct = async (req, res) => {
  const { name, price, quantity, description, imageUrl } = req.body; // Agrega imageUrl aquí
  await Product.update({ name, price, quantity, description, imageUrl }, { where: { id: req.params.id } }); // Y aquí
  res.redirect('/admin');
};


/*
Product.findByPk(req.params.id, { include: Reservation }) busca el producto con el ID especificado 
e incluye las reservaciones asociadas. Si el producto tiene reservaciones asociadas, se envía un mensaje
 al usuario indicando que el producto no puede ser eliminado. Si el producto no tiene reservaciones asociadas, 
 se elimina el producto como de costumbre.
*/
// Controlador para eliminar un producto
export const deleteProduct = async (req, res) => {
  const product = await Product.findByPk(req.params.id, { include: Reservation });

  if (product.Reservations && product.Reservations.length > 0) {
    res.status(400).json({ message: 'Este producto no puede ser eliminado porque tiene reservaciones asociadas' });
  } else {
    await Product.destroy({ where: { id: req.params.id } });
    res.redirect('/admin');
  }
};
/*
// Controlador para eliminar un producto
export const deleteProduct = async (req, res) => {
  await Product.destroy({ where: { id: req.params.id } });
  res.redirect('/admin');
};
*/
// Controlador para formatear la base de datos
export const formatDatabase = async (req, res) => {
  try {
    // Eliminar todas las tablas
    await db.sequelize.drop();

    // Crear todas las tablas
    await db.sequelize.sync();

    // Llamar a la función seedDatabase para llenar las tablas con datos de prueba
    //await seedDatabase();

    res.json({ message: 'La base de datos ha sido formateada con éxito.' });
  } catch (error) {
    console.error('Ocurrió un error al formatear la base de datos:', error);
    res.status(500).json({ message: 'Ocurrió un error al formatear la base de datos.' });
  }
};



/*
import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  const products = await Product.findAll();
  res.render('products', { products });
};

export const showAddProductForm = (req, res) => {
  res.render('addProduct');
};

export const createProduct = async (req, res) => {
  const { name, price } = req.body;
  await Product.create({ name, price });
  res.redirect('/products');
};
*/