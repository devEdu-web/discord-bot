import Bot from "../Bot/Bot.js"
import Util from "../../util/Util.js"
import Youtube from "../../services/youtube/Youtube.js"
import Merriam from "../../services/merriam/Merriam.js"
import { words } from "../Words/wordsList.js"

const lofiResources = [
  'https://www.youtube.com/watch?v=VTSIrwHUZ-M&list=PLHqFOoNjBw8o8caNZHl6gOSzqXi2dggWn&index=9&t=2260s&ab_channel=Mr_MoMoMusic',
  'https://www.youtube.com/watch?v=ykURWvAo6Eg&list=PLHqFOoNjBw8o8caNZHl6gOSzqXi2dggWn&index=11&ab_channel=LostInLofi',
  'https://www.youtube.com/watch?v=TGan48YE9Us&list=PLHqFOoNjBw8o8caNZHl6gOSzqXi2dggWn&index=20&ab_channel=TheJazzHopCaf%C3%A9',
  'https://www.youtube.com/watch?v=VVs59XjBmAQ&list=PLHqFOoNjBw8o8caNZHl6gOSzqXi2dggWn&index=17&ab_channel=LostInLofi',
  'https://www.youtube.com/watch?v=NDfF_XwNtIw&list=PLHqFOoNjBw8o8caNZHl6gOSzqXi2dggWn&index=10&ab_channel=Dreamy',
  'https://www.youtube.com/watch?v=lTRiuFIWV54&list=PLHqFOoNjBw8o8caNZHl6gOSzqXi2dggWn&index=4&ab_channel=LofiGirl',
  'https://www.youtube.com/watch?v=zFhfksjf_mY&list=PLHqFOoNjBw8o8caNZHl6gOSzqXi2dggWn&index=2&ab_channel=LofiGirl'
]
class Commands {
  constructor() {
    this.currentResult = undefined
    this.isUserChoosingSong = false
  }
  async lofime(channel) {
    try {
      const lofiResource = Util.sortResources(lofiResources)
      await Bot.play(lofiResource)
      const connection = await Bot.connectToChannel(channel)
      await connection.subscribe(Bot.player)
    } catch(error) {
      return error
    }
  }
  async playSong(message) {


    if(!this.isUserChoosingSong) {
      const commandToArray = message.content.split(' ')
      commandToArray.shift()
      const query = commandToArray.join(' ')


      const result = await Youtube.search(query)
      const resultObj = Util.mapResultArrayToObjects(result.items)
      const chooseMessage = Util.buildChooseMessage(resultObj)
      message.reply(chooseMessage)
      this.isUserChoosingSong = true
      this.currentResult = resultObj
    } else {

      const choice = message.content.split(' ')[1]
      const channel = message.member.voice.channel;
      // console.log(channel)
        if(channel) {
          try {
            await Bot.play(this.currentResult[choice].videoUrl)
            const connection = await Bot.connectToChannel(channel)
            await connection.subscribe(Bot.player)
            message.reply('Playing...')
          } catch(error) {
            return error
          }
        } else {
          message.reply('Please join a channel')
        }
      this.isUserChoosingSong = false
    }
  }
  async define(message) {
    const commandToArray = message.content.split(' ')
    commandToArray.shift()
    const word = commandToArray.join(' ')
    
    try {
      const response = await Merriam.getWord(word)
      const reply = Util.buildDefinitionsMessage(response)
      message.reply(reply)
    } catch(error) {
      console.log(error)
      throw error
    }
  }
}

export default new Commands()