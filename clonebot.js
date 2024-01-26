// server.js
// Importamos las dependencias usando la sintaxis de importación
import express from 'express'
import { Telegraf } from 'telegraf'

// Creamos el servidor Express y la instancia del bot Telegraf
const app = express()
const bot = new Telegraf('TOKEN')

// Establecemos la ruta /bot/webhook para recibir las actualizaciones del bot
// Usamos el método webhookCallback de Telegraf para simplificar el manejo
app.post('/bot/webhook', express.json(), bot.webhookCallback('/bot/webhook'))

// Manejamos los comandos '/start' y '/enviar' del bot
bot.start((ctx) => ctx.reply('Bienvenido al bot de prueba'))
bot.command('enviar', (ctx) => {
  // Obtenemos el mensaje del usuario
  const mensaje = ctx.message.text.split(' ').slice(1).join(' ')
  // Enviamos el mensaje al servidor Express usando una petición GET
  fetch(`http://localhost:3000/mensajes?mensaje=${mensaje}`)
    .then((res) => res.json())
    .then((data) => {
      // Si el servidor responde con éxito, enviamos el mensaje al usuario
      if (data.ok) {
        ctx.reply(`Tu mensaje fue: ${mensaje}`)
      } else {
        // Si hay algún error, lo notificamos al usuario
        ctx.reply('Hubo un problema al enviar tu mensaje')
      }
    })
})

// Iniciamos el servidor Express escuchando en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor Express iniciado en el puerto 3000')
})

// Lanzamos el bot usando bot.launch()
bot.launch()
