import axios from "axios"
import config from "../config.js"

class Product {
    static #basePath = `${config.baseUrl}/sites/MLA/search`

    static async getProducts(productQuery, page = 1) {
        const { data } = await axios.get(`${this.#basePath}?q=${encodeURIComponent(productQuery)}`);
        const { results } = data;
        return {
            results,
            page,
            total: 100
        };
    }
}

export default Product;