import fs from 'fs';
import config from '../config.js';

if (!fs.existsSync(config.dir)){
    fs.mkdirSync(config.dir);
}