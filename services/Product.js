import axios from "axios"
import config from "../config.js"

class Product {
    static #basePath = `${config.baseUrl}/sites/MLA/search`

    static async getProducts(productQuery, offset = 0) {
        const { data } = await axios.get(`${this.#basePath}?q=${encodeURIComponent(productQuery)}`, {
            params: {
                offset,
            }
        });
        const { results, paging } = data;
        return {
            results,
            paging
        };
    }
}

export default Product;