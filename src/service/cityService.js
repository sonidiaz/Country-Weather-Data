import Service from './Service.js';
const API_KEY = '0614d13377e407e8c0724c47d862443b'

export default {
    get(city) {
        return Service.get(`?q=${city}&units=metric&APPID=${API_KEY}`);
    }
}