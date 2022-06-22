import dotenv from 'dotenv';
dotenv.config();

import { getVoiceConnection } from '@discordjs/voice';
import Bot from './components/Bot/Bot.js';
import Commands from './components/Commands/Commands.js'
import Youtube from './services/youtube/Youtube.js'
import Util from './util/Util.js';

Bot.client.on('ready', () => {
  console.log('Bot is ready sir.')
})

Bot.client.on('messageCreate', async (message) => {
  if (!message.author.bot) {
    if (message.content.startsWith('--lofime')) {
      const channel = message.member.voice.channel;
      if (channel) {
        try {
          await Commands.lofime(channel)
          message.reply('Playing...');
        } catch (error) {
          throw error;
        }
      } else {
        message.reply('Join a voice channel and try again.');
      }
    } else if (message.content.startsWith('--leave')) {
      const channel = message.guild.id;
      try {
        const connection = getVoiceConnection(channel);
        connection.destroy();
      } catch(error) {
        message.reply('No player found')
      }
    } else if(message.content.startsWith('--play')) {
      const commandToArray = message.content.split(' ')
      commandToArray.shift()
      const query = commandToArray.join(' ')
      
      const result = await Youtube.search(query)
      const resultObj = Util.mapResultArrayToObjects(result.items)
      const chooseMessage = Util.buildChooseMessage(resultObj)
      message.reply(chooseMessage)


    }
  }
});


Bot.client.login(process.env.DS_TOKEN);
