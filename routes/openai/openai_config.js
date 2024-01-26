import {Configuration,OpenAIApi} from "openai"
import { config } from "dotenv";
config();
const apiKey = process.env.OPENAI_API_KEY
//console.log("Tu API KEY ES: ",apiKey)
const configuration=new Configuration({ apiKey }); 

export const openai = new OpenAIApi(configuration)


export const completion=async(code)=>{
    const result=await openai.createChatCompletion( {
        model:/* 'gpt-4-0314', */ /*|'gpt-4',*/ 'gpt-3.5-turbo',
        messages:[{ role:'user', content:`${code}`}],
    
    })
    return result
} 

export const generateImage = async (req, res) => {
  const { prompt } = req.body;
  try {
    if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Invalid prompt: prompt debe ser un string no vacio',
      });
    }

    const response = await openai.createImage({
      prompt,
      n: 1,
      size: '512x512',
    });

    const imageUrl = response.data.data[0].url;
    res.status(200).json({
      success: true,
      data: imageUrl,
      message: 'Image generated successfully',
    });
  } catch (error) {
    console.error('Error in /openai route:', error);
    if (error.code === 'ENOTFOUND') {
      res.status(500).json({
        success: false,
        message: 'Failed to connect to OpenAI API',
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to generate image',
      });
    }
  }
};