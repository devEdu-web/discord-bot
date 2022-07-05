import Commands from "./Commands.js"


// console.log(Commands)

const commandsMap = {
  '--lofime': Commands.lofime,
  '--pause': Commands.pauseSong,
  '--resume': Commands.resumeSong,
  '--skip': Commands.skipSong,
  // '--leave': Commands.
  '--define': Commands.define,
  '--help': Commands.help
}

export default commandsMap