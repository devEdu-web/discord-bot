import Bot from "../../Bot.js"

const lofiResource = 'https://www.youtube.com/watch?v=VTSIrwHUZ-M&list=PLHqFOoNjBw8o8caNZHl6gOSzqXi2dggWn&index=9&t=2260s&ab_channel=Mr_MoMoMusic'

class Commands {
  async lofime(channel) {
    try {
      await Bot.play(lofiResource)
      const connection = await Bot.connectToChannel(channel)
      await connection.subscribe(Bot.player)
    } catch(error) {
      return error
    }
  }
}

export default new Commands()