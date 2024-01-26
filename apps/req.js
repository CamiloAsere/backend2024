import express from 'express';
import { completion as getCompletion } from "../mongoose/GPT-4/openai_config.js";
import cors from "cors"
const app = express();
app.use(cors())
// Endpoint para obtener la respuesta de la API de OpenAI
app.get('/api/completion',async (req, res) => {
  try {
    const { code } = req.query;
  console.log("code: ",code)
    // Validar si el codigo esta presente
    if (!code) {
      return res.status(400).json({ error: 'No code provided' });
    }
    
    const completion = await getCompletion(code);
    
    const message = completion.data.choices[0].messages.content;
    
    res.json(message);
  } catch (error) {
    // Enviar una llave 'error' con la descripcion del error
    res.status(500).json({ error: error.message });
  }
});

// Funcion para manejar el error en la respuesta de la API
function handleAPIError(res, error) {
  res.status(500).json({ error: error.message });
}

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});