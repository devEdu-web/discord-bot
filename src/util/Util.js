import qs from 'querystring';
const youtubeVideoUrl = 'https://www.youtube.com/watch?v=';
class Util {
  sortResources(resourcesArray) {
    return resourcesArray[Math.floor(Math.random() * resourcesArray.length)];
  }
  genQueryParams(query) {
    return qs.stringify(query);
  }
  mapResultArrayToObjects(youtubeSearchResult) {
    const result = {};
    youtubeSearchResult.forEach((item, index) => {
      result[index + 1] = {
        videoId: item.id.videoId,
        title: item.snippet.title,
        videoUrl: `${youtubeVideoUrl}${item.id.videoId}`,
      };
    });
    return result;
  }
  buildChooseMessage(youtubeSearchResult) {
    const resultParsed = this.mapResultArrayToObjects(
      youtubeSearchResult.items
    );
    let message = ``;

    for (let [key, value] of Object.entries(resultParsed)) {
      message += `${key} - ${value.title} \n`;
    }

    return {
      message,
      resultParsed,
    };
  }
  handleUserChoice(choice, message) {
    const isNumber = Math.abs(choice);
    const isGreaterThan5 = isNumber > 5 ? true : false;

    if (!isNumber || isGreaterThan5) {
      return {
        error: true,
        message: 'Choice not available. Try again.',
      };
    }

    return {
      error: false,
    };
  }
  buildDefinitionsMessage(definitions) {
    let message = ``;

    if (definitions.length > 3) {
      for (let i = 0; i < 3; i++) {
        message += `**${definitions[i].meta.id}**\n`;
        definitions[i].shortdef.forEach((def, index) => {
          message += `${index + 1}. ${def}\n`;
        });
      }

      return message;
    } else {
      definitions.forEach((def, index) => {
        message += `**${def.meta.id}**\n`;
        def.shortdef.forEach((def, index) => {
          message += `${index + 1}. ${def}\n`;
        });
      });

      return message;
    }
  }
  buildHelpMessage(commandsList) {
    let message = '**Commands**\n';

    commandsList.forEach((command) => {
      message += `${command}\n`;
    });

    return message;
  }
  getYoutubeSearchQuery(message) {
    const commandToArray = message.content.split(' ');
    commandToArray.shift();
    const query = commandToArray.join(' ');

    return query;
  }
}

export default new Util();
