

const TelegramBot = require('node-telegram-bot-api');

const fetch = require ('node-fetch');

const {URLSearchParams} = require('url');

const token = '{Token_Telegram}';

const bot = new TelegramBot(token, {polling:true});

bot.on('polling_error', function(error){
    console.log(error)
});


bot.onText(/^\/start/, function(msg){

    var chatId = msg.chat.id;
    var username = msg.from.first_name;

    bot.sendMessage(chatId, "Hola, " + username + ", soy Sebastiane.");

});

const translater = (msg) =>{

    const body = new URLSearchParams();
    body.append('q', msg);
    body.append('source','es');
    body.append('target', 'en');

    return fetch("https://google-translate1.p.rapidapi.com/language/translate/v2", {
        "method": "POST",
        "headers": {
            "content-type": "application/x-www-form-urlencoded",
	        "accept-encoding": "application/gzip",
	        "x-rapidapi-key": "{API_KEY}",
	        "x-rapidapi-host": "google-translate1.p.rapidapi.com",
            "useQueryString": true

        },
        "body": body.toString()
    })
    .then(res => res.json())
    .then(response =>{
        console.log(response)

        return response.data.translations[0].translatedText;//
    })
    .catch(err =>{
        console.error(err);
    });

}

bot.on('message', async function(msg){
var chatId = msg.chat.id;

const translation = await translater(msg.text);
bot.sendMessage(chatId, translation);

});
