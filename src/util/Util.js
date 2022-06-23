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
  randomWord(wordsList) {
    const random = Math.floor(Math.random() * wordsList.length);
    return wordsList[random];
  }
}

export default new Util();