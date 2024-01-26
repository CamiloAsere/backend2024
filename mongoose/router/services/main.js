import { DatabaseSeeder } from './dataSeeder.js';

async function main() {
    const seeder = new DatabaseSeeder();

    // Llenar la base de datos con datos iniciales
    await seeder.seedDatabase();

    // Obtener un usuario con su plan de datos
    await seeder.getUserWithPlan('nombredeusuario');
    await seeder.getUserWithPlan('aiaa.hot');
    await seeder.getUserWithPlan('jorgecremades');
    await seeder.getUserWithPlan('camp');
    
}

export default main;