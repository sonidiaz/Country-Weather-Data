import Service from './Service.js';
import {API_KEY} from '../apikey.js'

export default {
    get(city) {
        return Service.get(`?q=${city}&units=metric&APPID=${API_KEY}`);
    }
}