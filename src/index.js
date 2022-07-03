import dotenv from 'dotenv';
dotenv.config();

import { getVoiceConnection } from '@discordjs/voice';
import Bot from './components/Bot/Bot.js';
import Commands from './components/Commands/Commands.js';
import Youtube from './services/youtube/Youtube.js';
import Util from './util/Util.js';
// import Bot from './components/Bot/Bot.js';

const astraBot = new Bot()
let isUserChoosingSong = false;
let currentResult;

astraBot.client.on('ready', () => {
  console.log('Bot is ready sir.');
});

astraBot.client.on('messageCreate', async (message) => {
  if (!message.author.bot) {
    if (message.content.startsWith('--lofime')) {
      const channel = message.member.voice.channel;
      if (channel) {
        try {
          await Commands.lofime(channel);
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
      } catch (error) {
        message.reply('No player found');
      }
    } else if (message.content.startsWith('--play')) {
      try {
        await Commands.playSong(message);
      } catch (error) {
        throw error;
      }
    } else if (message.content.startsWith('--define')) {
      try {
        await Commands.define(message);
      } catch (error) {
        message.reply(error.message);
      }
    } else if (message.content.startsWith('--help')) {
      Commands.help(message);
    } else if(message.content.startsWith('--skip')) {
      Commands.skipSong(message)
    }
  }
});

astraBot.client.login(process.env.DS_TOKEN);

// TODO: Check if the args are passed to each command and throw an error otherwise.
// TODO: Make a queue
// TODO: Make sure that each server has its own queue -> avoid shared queues
// TODO: Download current song into a file, and stream it from there. - Might have performance issues, since it needs to download the song before playing, but if we download only the audio, it wouldn't affect much the performance.