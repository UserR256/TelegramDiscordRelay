require('dotenv').config();
const Discord = require('discord.js');
const Telegraf = require('telegraf');
const { MessageEmbed } = require('discord.js');
const axios = require('axios');

const discordClient = new Discord.Client({
    intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]
});

const telegramBot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

discordClient.once('ready', () => {
    console.log('Discord bot is ready!');
});

discordClient.login(process.env.DISCORD_BOT_TOKEN);

telegramBot.on(['text', 'photo', ], async (ctx) => {
  if (ctx.chat.id == process.env.TELEGRAM_CHANNEL_ID) {
      const discordChannel = discordClient.channels.cache.get(process.env.DISCORD_CHANNEL_ID);
      if (discordChannel) {
          if (ctx.message.text) {
              discordChannel.send(`${ctx.from.first_name}: ${ctx.message.text}`);
          }
	    else if (ctx.message.photo) {
              // Telegram sends photos in different sizes. We'll use the largest one.
              const photo = ctx.message.photo[ctx.message.photo.length - 1];
              const photoInfo = await ctx.telegram.getFile(photo.file_id);
              const photoUrl = `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${photoInfo.file_path.toString()}`;

              // Download the image
              const response = await axios.get(photoUrl, { responseType: 'arraybuffer' });
              const buffer = Buffer.from(response.data, 'binary');

                  // Use the photo's caption if it exists, otherwise use a default message
                  let caption = ctx.message.caption ? ctx.message.caption : `${ctx.from.first_name}:`;
                  // caption = caption.replace(/(https?:\/\/[^\s]+)/g, '[$1]($1)'); // Not working atm

		         // Check if caption length is more then 2000 characters
                  if (caption.length > 2000) {
                  caption = caption.substring(0, 1997) + '...';
                  }
                      const embed = new MessageEmbed()
		                    .setImage('attachment://image.png') // Use the attached file for the image
		                    .setFooter({ text: caption });
                            const attachment = new Discord.MessageAttachment(buffer, 'image.png');;
                            const message = await discordChannel.send({ embeds: [embed], files: [attachment] });
                            console.log(`Message sent to Discord: ${message.id}`);
            }
        }
    }
});
telegramBot.launch().catch(error => console.error(`Failed to launch Telegram bot: ${error.message}`));
