import Bot from "../Bot/Bot.js"
import Util from "../../util/Util.js"

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
}

export default new Commands()