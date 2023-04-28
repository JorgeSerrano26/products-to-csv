import axios from "axios"
import config from "../config.js"

class Item {
    static #basePath = `${config.baseUrl}/items`

    static async getItem(itemId = '') {
        const { data } = await axios.get(`${this.#basePath}/${itemId}`);
        return data;
    }
}

export default Item;