import { Signal } from "./Utils/SIgnal2";

export class ChatIdGetter {
    constructor() {
        this.chatIdState = new Signal({
            chatId: '',
        });
    }

    getChatId(ctx) {
        const chatId = ctx.chat.id;
        if (chatId !== this.chatIdState.chatId) {
            this.chatIdState.chatId = chatId;
        }
        return this.chatIdState.chatId;
    }
}
/*
const chatIdGetter = new ChatIdGetter();

// En algún lugar de tu código donde tengas acceso a 'ctx'
const chatId = chatIdGetter.getChatId(ctx);
*/