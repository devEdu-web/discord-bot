import Bot from '../Bot/Bot.js';
import Util from '../../util/Util.js';
import Youtube from '../../services/youtube/Youtube.js';
import Merriam from '../../services/merriam/Merriam.js';
import commandsList from './commandsList.js';

const lofiResources = [
  'https://www.youtube.com/watch?v=VTSIrwHUZ-M&list=PLHqFOoNjBw8o8caNZHl6gOSzqXi2dggWn&index=9&t=2260s&ab_channel=Mr_MoMoMusic',
  'https://www.youtube.com/watch?v=ykURWvAo6Eg&list=PLHqFOoNjBw8o8caNZHl6gOSzqXi2dggWn&index=11&ab_channel=LostInLofi',
  'https://www.youtube.com/watch?v=TGan48YE9Us&list=PLHqFOoNjBw8o8caNZHl6gOSzqXi2dggWn&index=20&ab_channel=TheJazzHopCaf%C3%A9',
  'https://www.youtube.com/watch?v=VVs59XjBmAQ&list=PLHqFOoNjBw8o8caNZHl6gOSzqXi2dggWn&index=17&ab_channel=LostInLofi',
  'https://www.youtube.com/watch?v=NDfF_XwNtIw&list=PLHqFOoNjBw8o8caNZHl6gOSzqXi2dggWn&index=10&ab_channel=Dreamy',
  'https://www.youtube.com/watch?v=lTRiuFIWV54&list=PLHqFOoNjBw8o8caNZHl6gOSzqXi2dggWn&index=4&ab_channel=LofiGirl',
  'https://www.youtube.com/watch?v=zFhfksjf_mY&list=PLHqFOoNjBw8o8caNZHl6gOSzqXi2dggWn&index=2&ab_channel=LofiGirl',
];

const queue = [];

class Commands extends Bot {
  constructor() {
    super()
    this.currentResult = undefined;
    this.isUserChoosingSong = false;
  }
  async lofime(voiceChannel) {
    try {
      const lofiResource = Util.sortResources(lofiResources);
      await this.play(lofiResource, voiceChannel);
    } catch (error) {
      return error;
    }
  }
  async playSong(message) {
    if (!this.isUserChoosingSong) {

      const query = Util.getYoutubeSearchQuery(message);

      const youtubeSearchResult = await Youtube.search(query);
      const chooseMessage = Util.buildChooseMessage(youtubeSearchResult);
      message.reply(chooseMessage.message);
      this.isUserChoosingSong = true;
      this.currentResult = chooseMessage.resultParsed;
    } else {
      const choice = message.content.split(' ')[1];
      const isChoiceValid = Util.handleUserChoice(choice, message)
      
      if(isChoiceValid.error) {
        message.reply(isChoiceValid.message)
      }

      const channel = message.member.voice.channel;
      if (channel) {
        try {

          this.player.setMaxListeners(1)
          this.player.removeAllListeners()

          if(this.player.state.status !== 'playing') {
            await this.play(this.currentResult[choice].videoUrl, channel);
            message.reply(`Playing ${this.currentResult[choice].title}`);
          } else {
            message.reply(`Queueing ${this.currentResult[choice].title}`)
            queue.push(this.currentResult[choice])
          }

          
          this.player.addListener('stateChange', async (oldState, newState) => {
            if(newState.status == 'idle') {
              if(queue.length > 0) {
                await this.play(queue[0].videoUrl, channel);
                message.reply(`Playing ${queue[0].title}`);
                queue.shift()
              } else {
                message.reply('Queue is over.');
              }
            }
          })          

        } catch (error) {
          return error;
        }
      } else {
        message.reply('Please join a channel');
      }
      this.isUserChoosingSong = false;
    }
  }

  async skipSong(message) {
    const channel = message.member.voice.channel;
    if(queue.length == 0) {
      return message.reply('No songs on queue.');
    }

    try {
      await this.play(queue[0].videoUrl, channel);
      message.reply(`Playing ${queue[0].title}`);
      queue.shift()
      console.log(queue)
    } catch(error) {
      console.log(error)
    }

  }

  pauseSong(message) {
    if(this.player.state.status !== 'playing') {
      return message.reply('No song is playing.')
    }
    this.player.pause()
  }

  resumeSong(message) {
    if(this.player.state.status !== 'idle') {
      return message.reply('No song is paused.')
    }
    this.player.unpause()
  }

  async define(message) {
    const commandToArray = message.content.split(' ');
    commandToArray.shift();
    const word = commandToArray.join(' ');

    try {
      const response = await Merriam.getWord(word);
      const reply = Util.buildDefinitionsMessage(response);
      message.reply(reply);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async help(message) {
    const helpMessage = Util.buildHelpMessage(commandsList);
    message.reply(helpMessage);
  }
}

export default new Commands();
