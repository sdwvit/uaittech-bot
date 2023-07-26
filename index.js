const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config()
// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.BOT_TOKEN;
const adminChatId = process.env.ADMIN_CHATID;

console.log('Starting a bot', token)

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
const anHour = 1000 * 60 * 60;
let lastTimeTriggered;
bot.onText(/my.*(size|length).*\d+/gi, (msg, match) => {
    const now = new Date();
    if (now.getDay() !== 2) {
        if (lastTimeTriggered && (lastTimeTriggered + anHour > now.getTime())) {
            const chatId = msg.chat.id;
            const topic = {};
            if (msg.is_topic_message) {
                topic.message_thread_id = msg.message_thread_id;
            }
            bot.sendMessage(msg.from.id, msg.text);
            bot.sendMessage(adminChatId, msg.text);
            bot.deleteMessage(chatId, msg.message_id);
            bot.sendMessage(chatId, `${process.env.RESPONSE1} (таймаут: ${Math.ceil((lastTimeTriggered + anHour - now.getTime()) / 1000 / 60)} хв)`, topic);
        } else {
            lastTimeTriggered = +now;
        }
    }
})

