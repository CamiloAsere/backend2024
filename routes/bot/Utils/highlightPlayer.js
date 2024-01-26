//export const highlightPlayer = (player ) => `[${player.name}](tg://user?id=${player.id})`;
export const highlightPlayer = (player) => {
    // Crear un enlace a la cuenta de Telegram del jugador
    return `<a href="tg://user?id=${player.id}">${player.newName}</a>`;
};

/*
export const getMe=function(ctx) {

    const name=('Hola '+ctx.from.first_name+'\n <code>Te gustan las etiquet{a} html? : </code>')
    const url = 'tg://user?id=' + ctx.from.id; 
    
    const link =`<a href="${url}">${ctx.from.first_name}</a>` 
    //tg://user?id=123456789
    //http://telegram.me/
    
    
    return bot.telegram.sendMessage(ctx.from.id,name + link,{parse_mode:"HTML"})

    }
    */
    export const getMe = function(ctx) {
        const name = 'Hola ' + ctx.from.first_name + '\n <code>Te gustan las etiquet{a} html? : </code>';
        const url = 'tg://user?id=' + ctx.from.id;
        const link = `<a href="${url}">${ctx.from.first_name}</a>`;
        const message = name + link;
        return {text: message, parse_mode: "HTML"};
    }
    