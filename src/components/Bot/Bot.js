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
        Intents.FLAGS.GUILD_VOICE_STATES,
      ],
    });
    this.player = createAudioPlayer();
  }

  async play(resource, voiceChannel) {
    try {
      this.prepareSong(resource);
      const connection = await this.connectToChannel(voiceChannel);
      await connection.subscribe(this.player);
    } catch (error) {
      return error;
    }
  }

  prepareSong(resource) {
    const stream = ytdl(resource, { filter: 'audioonly' });
    const resourcePassed = createAudioResource(stream, {
      inputType: StreamType.Arbitrary,
    });
    this.player.play(resourcePassed);
    return entersState(this.player, AudioPlayerStatus.Playing, 10e4);
  }

  async connectToChannel(voiceChannel) {
    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });
    try {
      entersState(connection, VoiceConnectionStatus.Ready, 30e5);
      return connection;
    } catch (error) {
      connection.destroy();
      return error;
    }
  }
}

export default Bot;
