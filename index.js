const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config()
// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.BOT_TOKEN;
const adminChatId = process.env.ADMIN_CHATID;

console.log('Starting a bot', token, adminChatId)

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

bot.onText(new RegExp(process.env.MATCH1, 'gi'), (msg, match) => {
    const today = new Date().getDay();
    if (today !== 2) {
        const chatId = msg.chat.id;
        const topic = {};
        if (msg.is_topic_message) {
            topic.message_thread_id = msg.message_thread_id;
        }
        bot.deleteMessage(chatId, msg.message_id);
        bot.sendMessage(chatId, process.env.RESPONSE1, topic);
    }
})
