import { Configuration, OpenAIApi } from "openai";
// config.js
import dotenv from 'dotenv';
//const apiKey="aaaa*****"
dotenv.config();

const code=`Realizar un trabajo escrito tomando como ejemplo el libro "Auditoría y Sistemas Informáticos" de Lázaro J. Blanco utiliza gestores biblbiograficos como metodo de investigacio segun los requsitos:

Libro auditoría y sistemas informáticos de Lázaro J. Blanco
1-Formato del documento a entregar: 
-Capa, 
-Resumen, 
-Índice automático, 
-Desarrollo (en este acápite debe utilizar citas bibliográficas, incluye el contenido de la cita y la referencia), 
-Conclusiones 
-Bibliografía (En el listado de la bibliografía al menos 10 referencias bibliográficas. Debe usar en la redacción del informe un gestor bibliográfico, y aplicar una de las normas y/o estilos estudiados en clase). 
2-si es posible que salga en formato .doc`



const apiKey = process.env.API_KEY  
//console.log("Tu API KEY ES: ",apiKey) 
const configuration = new Configuration({ apiKey })
const openai = new OpenAIApi(configuration)

export const completion = await openai.createChatCompletion( {
    model:/* 'gpt-4-0314', */ /*|'gpt-4',*/ 'gpt-3.5-turbo',
    messages:[{ role:'user', content:`${code}`}],

} )




console.log(completion.data.choices[0].message)
export const  sent =completion.data.choices[0].message.content
