import { roles } from "../bot actions/roles.js";

// Definir una función para enviar mensajes a un chat específico utilizando el bot de Telegram
function sendMessageToPlayer(bot,chatId, message) {
  // Utilizar el método `bot.telegram.sendMessage` para enviar el mensaje al chat especificado
  bot.telegram.sendMessage(chatId, message);
}

// Definir una clase CustomPlayerMessage para generar mensajes personalizados para cada jugador
class CustomPlayerMessage {
  constructor(player, roles) {
    // Inicializar el jugador y el arreglo de roles
    this.player = player;
    this.roles = roles;
  }

  getMessage() {
    /*
    players.forEach((player) => {
      const roleInfo = roles[this.player.role]();
      console.log(`${player.name} is a ${roleInfo.roleName}`);
  
      bot.telegram.sendMessage(ctx.chat.id,`${player.name} is a ${roleInfo.roleName}`)
  
    });
*/
    
    // Buscar el rol del jugador en el objeto de roles
    const rolesP=this.player.role
    
    //const roleName=roles[this.player.role].roleName;
    //const description=roles[this.player.role].notes;
    

    console.log("this.player.role ",rolesP)
    /*
    //console.log("description ",`${roleName} ${description}`)
    //console.log("role: ",[playerRole])
    */
    // Generar el mensaje personalizado utilizando la información del rol del jugador
    const message = `Hola ${this.player.name}, tu rol es: ${this.player.role} ${this.player.emoji}`

    return message;
  }
}

// Exportar la clase CustomPlayerMessage y la función sendMessageToChat para que puedan ser utilizadas en otro archivo

// Exportar la clase CustomPlayerMessage y la función sendMessageToChat para que puedan ser utilizadas en otro archivo
export { CustomPlayerMessage, sendMessageToPlayer };
