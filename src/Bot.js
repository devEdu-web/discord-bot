import ytdl from 'ytdl-core';
import { Client, VoiceChannel, Intents } from 'discord.js';
import {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  entersState,
  StreamType,
  AudioPlayerStatus,
  VoiceConnectionStatus,
  getVoiceConnection,
} from '@discordjs/voice';

class Bot {
  constructor() {
    this.client = new Client({
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES  
    ]
    })
    this.player = createAudioPlayer()
  }

  play(resource) {
    const stream = ytdl(resource, { filter: 'audioonly' })
    const resourcePassed = createAudioResource(stream, {
      inputType: StreamType.Arbitrary
    })
    this.player.play(resourcePassed)
    return entersState(this.player, AudioPlayerStatus.Playing, 5e4)
  }

  async connectToChannel(channel) {
    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator
    })

    try {
      entersState(connection, VoiceConnectionStatus.Ready, 30e5)
      return connection
    } catch(error) {
      connection.destroy()
      return error
    }

  }

}

export default new Bot()