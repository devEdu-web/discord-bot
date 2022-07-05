import dotenv from 'dotenv';
dotenv.config();

import Bot from './components/Bot/Bot.js';
import Commands from './components/Commands/Commands.js';
import commandsMap from './components/Commands/commandsMap.js';

const astraBot = new Bot()

astraBot.client.on('ready', () => {
  console.log('Bot is ready sir.');
});

astraBot.client.on('messageCreate', async (message) => {
  if (!message.author.bot) {
    const voiceChannel = message.member.voice.channel;
    const channelToDestroy = message.guild.id

    if(message.content.startsWith('--') && !message.content.startsWith('--play')) {
      try {
        const command = message.content.split(' ')[0]
        await commandsMap[command]({
          message,
          voiceChannel,
          channelToDestroy
        })
      } catch(error) {
        console.log(error)
      }
    } else if(message.content.startsWith('--play')) {
      try {
        Commands.playSong({
          message,
          channelToDestroy,
          voiceChannel
        })
      } catch(error) {
        console.log(error)
      }
    }


    
  }
});

astraBot.client.login(process.env.DS_TOKEN);

// TODO: Check if the args are passed to each command and throw an error otherwise.
// TODO: Download current song into a file, and stream it from there. - Might have performance issues, since it needs to download the song before playing, but if we download only the audio, it wouldn't affect much the performance.
// TODO: Implement a leave command