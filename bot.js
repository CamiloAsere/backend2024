import { Telegraf } from 'telegraf';
import { config} from 'dotenv';
import express from 'express';
import cors from 'cors';
import { openai } from './routes/openai/openai_config.js';

const app = express();
const port = process.env.PORT || 3000;
config();
app.use(cors());

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start((ctx) => ctx.reply('¡Hola! Soy un bot de ChatGPT. ¿En qué puedo ayudarte?'));

const completion = async (message) => {
  try {
    const result = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: `${message}` }],
    });
    return result;
  } catch (error) {
    console.error(error);
    return { error: 'Hubo un error al procesar tu solicitud.' };
  }
};

bot.command('gpt', async (ctx) => {
  const message = ctx.message.text.split(' ').slice(1).join(' ');
  try {
    const completionResult = await completion(message);
    if (completionResult.error) {
      ctx.reply(completionResult.error);
    } else {
      const sent = completionResult.data.choices[0].message.content;
      ctx.reply(sent);
    }
  } catch (error) {
    console.error(error);
    ctx.reply('Lo siento, hubo un error al procesar tu solicitud.');
  }
});

bot.launch();

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});