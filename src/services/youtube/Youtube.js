import dotenv from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '..', '..', '.env') });

import axios from 'axios';
import Util from '../../util/Util.js';

const baseUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=${process.env.YT_API_KEY}&regionCode=US&`;

class Youtube {
  async search(query) {
    try {
      const q = Util.genQueryParams({ q: query });
      const response = await axios.get(`${baseUrl}${q}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

export default new Youtube();
