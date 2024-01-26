import { Signal } from "./SIgnal2.js";

export class MessageSender {
    constructor(bot, chatId) {
        this.bot = bot;
        this.chatId = chatId;
        this.messageState = new Signal({
            lastMessage: '',
        });

        // Suscribirse a 'lastMessage' para enviar un mensaje cada vez que cambia
        this.messageState.subscribe('lastMessage', (newMessage) => {
            if (newMessage !== '') {
                this.bot.telegram.sendMessage(this.chatId, newMessage, { parse_mode: 'HTML' });
            }
        });
    }

    sendMessage(message) {
        if (message !== this.messageState.lastMessage) {
            // Actualizar 'lastMessage' desencadenará la función suscrita
            this.messageState.lastMessage = message;
        }
    }
}
