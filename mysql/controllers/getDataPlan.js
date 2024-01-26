//

import db from "../db/db.js";

// Controlador para obtener los planes de datos de todos los usuarios

export const getAllDataPlans = async (req, res) => {
    try {
        const users = await db.User.findAll({
            include: db.DataPlan
        });

        if (!users) {
            res.status(404).send({ message: 'No se encontraron usuarios.' });
            return;
        }
        console.log("users with DataPlan",users)
        let userPlans = {};

        for (let user of users) {
            const { username, DataPlan } = user;
            if (DataPlan) {
                userPlans[username] = {
                    name: DataPlan.name,
                    dataUsed: DataPlan.dataUsed,
                    quota: DataPlan.quota
                };
            } else {
                // Maneja el caso en que DataPlan es null
                // Por ejemplo, podrías asignar valores predeterminados:
                userPlans[username] = {
                    name: 'No plan',
                    dataUsed: 0,
                    quota: 0
                };
            }
        }
        

        res.send(userPlans);
    } catch (error) {
        console.error(error,error.message);
        res.status(500).send({ message: 'Ocurrió un error al obtener los planes de datos.' });
    }
};

export const getUserDataPlan = async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await db.User.findByPk(userId, {
            include: db.DataPlan
        });

        if (!user) {
            res.status(404).send({ message: 'Usuario no encontrado.' });
            return;
        }

        if (!user.DataPlan) {
            res.status(404).send({ message: 'No se encontró un plan de datos para el usuario.' });
            return;
        }
        console.log("|Selected user with one especific DataPlan",user)
        const { DataPlan } = user;
        let userDataPlan = {
            name: DataPlan.name,
            dataUsed: DataPlan.dataUsed,
            quota: DataPlan.quota
        };

        res.send(userDataPlan);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Ocurrió un error al obtener el plan de datos del usuario.' });
    }
};



/*
1. **getAllDataPlans**: Este controlador obtiene todos los usuarios y sus planes de datos asociados. Para cada usuario, crea un objeto que contiene el nombre del plan de datos, los datos utilizados y la cuota, y luego envía estos objetos en la respuesta.

2. **getUserDataPlan**: Este controlador obtiene un usuario específico y su plan de datos asociado. Solo devuelve la información del plan de datos del usuario especificado, no la información del usuario en sí.

Estos controladores deberían proporcionarte la funcionalidad que necesitas para trabajar con usuarios y planes de datos en tu aplicación. ¡Buena suerte con tu proyecto! 😊
  */
 