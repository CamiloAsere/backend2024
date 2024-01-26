import { DataPlan } from "../../models/DataPlan.js";
import { User } from "../../models/User.js";
import { createOrUpdateDocumentsA, createOrUpdateDocumentsB , createDocuments, createOrUpdateDocuments} from "./createDoc.js";


export class DatabaseSeeder {
    // ...

    async seedDataPlan() {
        // Crear algunos planes de datos
        const dataPlans = [
            { name: 'Normal', quota: 1000 },
            { name: 'Premium', quota: 2500 },
            { name: 'Special', quota: 7000 },
            // Más planes de datos...
        ];
    
        const dataPlanIds = {};
        for (const plan of dataPlans) {
        let document = await DataPlan.findOne({ name: plan.name }); // Cambia 'const' por 'let'
        if (document) {
            console.log(`Ya existe un plan de datos con el nombre ${plan.name}, actualizando...`);
            Object.assign(document, plan);
        } else {
            console.log(`Creando un nuevo plan de datos con el nombre ${plan.name}`);
            document = new DataPlan(plan);
        }
        await document.save();
        dataPlanIds[plan.name] = document.id;
    }

    return dataPlanIds;
    }
    
    async seedUsers(dataPlanIds) {
        // Crear algunos usuarios
        const users = [
            {
                name: 'Nombre del usuario',
                email: 'email@dominio.com',
                username: 'nombredeusuario',
                dataPlan: [ dataPlanIds['Normal'] ],
                role: 'user',
                userType: 'worker'
            },
            {
                name: 'Aiaa',
                email: 'myemail@dominio.com',
                username: 'aiaa.hot',
                dataPlan: [ dataPlanIds['Normal'], dataPlanIds['Special'] ],
                role: 'user',
                userType: 'student' 
            },
            {
                name: 'George',
                email: 'george89@gmail.com',
                username: 'jorgecremades',
                dataPlan: [],
                role: 'admin',
                userType: 'worker' 
            },
            {
                name: 'Camilo',
                email: 'camilo9mz5@gmail.com',
                username: 'camp',
                dataPlan: [ dataPlanIds['Special'],dataPlanIds['Premium'],dataPlanIds['Normal'] ],
                role: 'admin',
                userType: 'worker' 
            }
            // Más usuarios...
        ];
        return createOrUpdateDocuments(User, users);
    }

    async seedDatabase() {
        const dataPlanIds = await this.seedDataPlan();
        await this.seedUsers(dataPlanIds);
        // ...
    }

    async getUserWithPlan(username) {
        // Obtener un usuario con su plan de datos
        const user = await User.findOne({ username: username }).populate('dataPlan');
        if (!user) {
            console.log(`No se encontró un usuario con el nombre de usuario ${username}`);
            return;
        }
        if (user.dataPlan && user.dataPlan.length > 0) {
            let planDetails = [];
            for (const plan of user.dataPlan) {
                planDetails.push(`${plan.name} (cuota: ${plan.quota})`);
            }
            console.log(`El usuario ${username} tiene ${user.dataPlan.length} plan(es) de datos: ${planDetails.join(', ')}`);
        } else {
            console.log(`El usuario ${username} no tiene un plan de datos asignado`);
        }
    }
    
    
    
}
