# Discord Bot
Simple Discord Bot with general purposes.

## Commands

* --lofime
  * Play a random lofi from the lofi resources.
* --play `song_name`
  * Open a choose-menu so the user can play a song. The user just have to type `--plpay <1, 2, 3, 4 or 5>`.
* --pause
  * Pause current song playing.
* --resume
  * Resume current son paused.
* --leave
  * The bot leaves the voice channel and stops playing audio.
* --define `word`
  * Show the definition of the typed word.
* --help
  * Show all commands available.

## Usage

1. Set up a Discord application od [Discord Developer Portal](https://discord.com/developers/applications), get an API KEY and add the Bot to a server.
2. Populate the `.env` file with your API_KEY.
3. Run `npm install`.
4. Run `node src/index.js`
