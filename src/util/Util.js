import qs from 'querystring';
const youtubeVideoUrl = 'https://www.youtube.com/watch?v=';
import { words } from '../components/Words/wordsList.js';
class Util {
  sortResources(resourcesArray) {
    return resourcesArray[Math.floor(Math.random() * resourcesArray.length)];
  }
  genQueryParams(query) {
    return qs.stringify(query);
  }
  mapResultArrayToObjects(resultArray) {
    const result = {};
    resultArray.forEach((item, index) => {
      result[index + 1] = {
        videoId: item.id.videoId,
        title: item.snippet.title,
        videoUrl: `${youtubeVideoUrl}${item.id.videoId}`,
      };
    });
    return result;
  }
  buildChooseMessage(resultObj) {
    let message = ``;

    for (let [key, value] of Object.entries(resultObj)) {
      message += `${key} - ${value.title} \n`;
    }

    return message;
  }
  buildDefinitionsMessage(definitions) {
    let message = ``

    if(definitions.length > 3) {
      for(let i = 0; i < 3; i++) {
        message += `**${definitions[i].meta.id}**\n`
        definitions[i].shortdef.forEach((def, index) => {
          message += `${index + 1}. ${def}\n`
        })
  
      }
  
      return message
    } else {
      definitions.forEach((def, index) => {
        message += `**${def.meta.id}**\n`
        def.shortdef.forEach((def, index) => {
          message += `${index + 1}. ${def}\n`
        })
  
      })
  
      return message
    }

  }
}

export default new Util();