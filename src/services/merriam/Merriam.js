import axios from "axios";
import qs from 'querystring'
import dotenv from 'dotenv'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path'
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path:  path.join(__dirname, '..', '..', '..', '.env')})

const baseUrl = 'https://www.dictionaryapi.com/api/v3/references/learners/json'

class Merriam {
  async getWord(word) {
    try {
      const fullUrl = `${baseUrl}/${word}?key=${process.env.MERRIAM_LEARNER_API_KEY}`
      const response = await axios.get(fullUrl)
      if(response.data.length == 0) {
        throw new Error('Word not found.')
      } else {

        return response.data
      }
    } catch(error) {
      throw error
    }
  }
}

export default new Merriam()