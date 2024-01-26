import printInColor from "../../../routes/st/color.js";

export async function createDocuments(Model, documents, uniqueField = 'name') {
    const ids = [];
    for (const doc of documents) {
        // Buscar un documento existente con el mismo valor en el campo único
        const existingDoc = await Model.findOne({ [uniqueField]: doc[uniqueField] });
        if (existingDoc) {
            console.log(printInColor('Ya existe un documento con el ','yellow') + printInColor(`${uniqueField}`,'green' ) + printInColor(` ${doc[uniqueField]}`,'red'));
        } else {
            const document = new Model(doc);
            await document.save();
            ids.push(document.id);
            console.log('Se ha creado un nuevo documento con el ' + printInColor(`${uniqueField}`,'blue' ) + printInColor(` ${doc[uniqueField]}`,'red'));
        }
    }
    return ids;
}


/*
//actualice documentos existentes en lugar de omitirlos.
En este código, si se encuentra un documento existente, se actualiza con los nuevos datos utilizando Object.assign(document, doc). 
Si no se encuentra un documento existente, se crea uno nuevo. Luego, se guarda el documento (ya sea nuevo o actualizado) y se agrega su ID a la lista ids.
*/

export async function createOrUpdateDocumentsA(Model, documents, uniqueField = 'name') {
    const ids = [];
    for (const doc of documents) {
        // Buscar un documento existente con el mismo valor en el campo único
        let document = await Model.findOne({ [uniqueField]: doc[uniqueField] });
        if (document) {
            console.log(printInColor('Ya existe un documento con el ','yellow') + printInColor(`${uniqueField}`,'green' ) + printInColor(` ${doc[uniqueField]}`,'red'+' actualizando...'));
            // Actualizar el documento existente con los nuevos datos
            Object.assign(document, doc);
        } else {
           console.log(printInColor('Creando un nuevo documento con el','blue')+ printInColor(`${uniqueField} ${doc[uniqueField]}`,'green'),);
            // Crear un nuevo documento
            document = new Model(doc);
        }
        // Guardar el documento (nuevo o actualizado)
        await document.save();
        ids.push(document.id);
        console.log('Se ha creado un nuevo documento con el ' + printInColor(`${uniqueField}`,'blue' ) + printInColor(` ${doc[uniqueField]}`,'red'));
       
    }
    return ids;
}

/*
En este código, Model.findOneAndUpdate({ [uniqueField]: doc[uniqueField] }, doc, { new: true, upsert: true })
 busca un documento existente con el mismo valor en el campo único y lo actualiza con los nuevos datos.
  Si no se encuentra un documento existente, se crea uno nuevo. La opción { new: true } hace que el método 
  devuelva el documento actualizado en lugar del original, y la opción { upsert: true } hace que se cree 
  un nuevo documento si no se encuentra uno existente.
*/
export async function createOrUpdateDocumentsB(Model, documents, uniqueField = 'name') {
    const ids = [];
    for (const doc of documents) {
        // Buscar un documento existente con el mismo valor en el campo único
        let document = await Model.findOne({ [uniqueField]: doc[uniqueField] });
        if (document) {
            console.log(`Ya existe un documento con el ${uniqueField} ${doc[uniqueField]}, actualizando...`);
            // Actualizar el documento existente con los nuevos datos
            Object.assign(document, doc);
        } else {
            // Comprobar si ya existe un usuario con el mismo correo electrónico
            if (Model === User && await User.findOne({ email: doc.email  })) {
                console.log(`Ya existe un usuario con el correo electrónico ${doc.email}`);
                continue;
            }
            console.log(`Creando un nuevo documento con el ${uniqueField} ${doc[uniqueField]}`);
            // Crear un nuevo documento
            document = new Model(doc);
        }
        // Guardar el documento (nuevo o actualizado)
        await document.save();
        ids.push(document.id);
    }
    return ids;
}

export async function createOrUpdateDocuments(Model, documents, uniqueField = 'name') {
    // Si documents no es un array, convertirlo en un array
    if (!Array.isArray(documents)) {
        documents = [documents];
    }

    const ids = [];
    for (const doc of documents) {
        try {
            let document = await Model.findOne({ [uniqueField]: doc[uniqueField] });
            if (document) {
                console.log(`Ya existe un documento con el ${uniqueField} ${doc[uniqueField]}, actualizando...`);
                Object.assign(document, doc);
            } else {
                console.log(`Creando un nuevo documento con el ${uniqueField} ${doc[uniqueField]}`);
                document = new Model(doc);
            }
            await document.save();
            ids.push(document.id);
        } catch (err) {
            
            console.log(`Error al guardar el documento con el ${uniqueField} ${doc[uniqueField]}: ${err.message}`);
        }
    }
    return ids;
}
