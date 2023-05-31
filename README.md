# Telegram to Discord Relay Bot

This project is a simple relay bot that forwards messages from a specific Telegram channel to a Discord channel. It's built with Node.js and uses the `discord.js` and `telegraf` libraries to interact with the Discord and Telegram APIs.

## Features

- Relays text messages and photos from Telegram to Discord.
- Supports captions for photos.
- Handles messages that exceed Discord's maximum message length.

## Setup

1. Clone this repository to your local machine.
2. Run `npm install` to install the required dependencies.
3. Copy env.example to .env in the root directory of the project, and add the following environment variables:

```
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
DISCORD_BOT_TOKEN=your_discord_bot_token
TELEGRAM_CHANNEL_ID=your_telegram_channel_id
DISCORD_CHANNEL_ID=your_discord_channel_id
```

Replace `your_telegram_bot_token`, `your_discord_bot_token`, `your_telegram_channel_id`, and `your_discord_channel_id` with your actual bot tokens and channel IDs.

4. Run `node index.js` (or whatever your main file is named) to start the bot.

## Usage

Once the bot is running, it will automatically relay any text messages or photos sent in the specified Telegram channel to the specified Discord channel. Photo messages will include the photo's caption, if one exists.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)

---

Please modify this template to suit your project's needs.
