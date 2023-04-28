import { appendFileSync } from 'fs';
import config from './config.js';

export const writeCSV = async (header, body) => {
    await appendFileSync(`${config.dir}/${config.fileName}`, header)
    await appendFileSync(`${config.dir}/${config.fileName}`, body)
}