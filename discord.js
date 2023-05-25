require('dotenv').config();
const Discord = require('discord.js');
const Telegraf = require('telegraf');

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
          } else if (ctx.message.photo) {
              // Telegram sends photos in different sizes. We'll use the largest one.
              const photo = ctx.message.photo[ctx.message.photo.length - 1];
              const photoInfo = await ctx.telegram.getFile(photo.file_id);
              const photoUrl = `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${photoInfo.file_path.toString()}`;
                  // Use the photo's caption if it exists, otherwise use a default message
                const caption = ctx.message.caption ? ctx.message.caption : `${ctx.from.first_name}:`;
                try {
                const embed = new MessageEmbed()
                .setImage(photoUrl)
                .setFooter(caption);
                const message = await discordChannel.send({ embeds: [embed] });
                console.log(`Message sent to Discord: ${message.id}`);
                } catch (error) {
                console.error(`Failed to send photo to Discord: ${error.message}`);
            }
          }
      }
  }
});
telegramBot.launch();