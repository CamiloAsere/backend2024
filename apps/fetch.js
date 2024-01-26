// Esta función crea una API usando un Proxy que acepta recursos válidos
// Recibe como parámetros la URL base de la API y un array de recursos aceptados
// Devuelve un objeto Proxy que permite hacer peticiones a la API usando la sintaxis api.recurso(id)
const createApi = (url, acceptedResources) => {
  return new Proxy({}, {
    get: (target, prop) => {
      return async (id) => {
        if (!acceptedResources.includes(prop)) {
          return Promise.reject({ error: `Resource ${prop} not accepted` });     
        }
        // Declaramos la variable resource fuera del bloque try, usando let
        let resource;
        try {
          // Asignamos el valor a la variable resource dentro del bloque try, usando template literals
          resource  =  `${url}/${prop}/${id} `;
         //console.log("resource log ",resource)
          const res = await fetch(resource);
          return res.json();
        } catch (error) {
          // Usamos try...catch para manejar los errores
          console.log( `Something went wrong on fetching ${resource} - Here goes the error: ` , error);
        }
      };
    }
  });
};

// Definimos las constantes que usaremos para crear la API
const URL = "https://swapi.dev/api";
const ACCEPTED_RESOURCES = ['people', 'planets', 'starships', 'films'];

// Creamos la API usando la función createApi
const api = createApi(URL, ACCEPTED_RESOURCES);
// Esta función hace varias peticiones a la API usando el objeto api creado por la función createApi
// Recibe como parámetro un id numérico
// Devuelve un array con objetos que contienen los datos de las peticiones
export default async function Fetch(id) {
  try {
    // Usamos async...await para simplificar el código asíncrono
    // Usamos destructuring para extraer los datos que necesitamos de las respuestas de la API
    const { name: luke } = await api.people(id);
    const { name: planet } = await api.planets(id);
    const starship = await api.starships(id);
    const { title: film } = await api.films(id);
    return [{
      luke,
      planet,
      starship,
      film
    }];
  } catch (error) {
    throw new Error("Something went wrong on fetching data from the API - Here goes the error: " + error);
  }
}



/*
const URL="https://swapi.dev/api"
const ACCEPTED_RESOURCES=['people','planets','starships','films',]
const createApi = (url,acceptedResources ) => {
    return new Proxy({}, {
    get: (target, prop)  => {
    return async (id) => {
        
        if (!acceptedResources.includes(prop))
        //console.error({error:`Resource ${prop} not accepted`});
       return Promise.reject({error:`Resource ${prop} not accepted`})
    try {
            const resource=`${url}/${prop}/${id}`
            const res = await fetch(resource) 
            return res.json()
            
           
        } catch (error) {
            console.log(`Something went wrong on fetching ${url}/${prop}/${id}-Here goes the error: `,error)
        }
       
       }
     }
  })
}


const api=createApi(URL,ACCEPTED_RESOURCES )
export const luke =await api.people(1)
export const myplanet=await api.planets(1)
export const starship=await api.starships(1)
export const film=await api.films(2)
console.log({luke:luke.name})
console.log("planet=",myplanet.name)
console.log("starship=",starship)
console.log("film=",film.title)

*/

/*
  Tema del trabajo a realizar : gestores bibliograficos
  Formato del documento a entregar: 
  -Capa, 
  -Resumen, 
  -Índice automático, 
  -Desarrollo (en este acápite debe utilizar citas bibliográficas, incluye el contenido de la cita y la referencia), 
  -Conclusiones 
  -Bibliografía (En el listado de la bibliografía al menos 10 referencias bibliográficas. Debe usar en la redacción del informe un gestor bibliográfico, y aplicar una de las normas y/o estilos estudiados en clase). 
  */