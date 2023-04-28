/**
 * Init dependencies
 */
import './bootstrap.js';

/**
 * Dependencies
 */
import { writeCSV } from './CSV.js';
import config from './config.js';
import Product from './services/Product.js';


const buildHeader = () => {
    return config.columns.map(({ name }) => name).join(';') + "\n";
}

const formatProduct = (product) => {
    return config.columns.map(({key}) => product[key]).join(";")
}

const buildBody = (products) => {
    return products.map(formatProduct).join("\n");
}

async function start() {
    //initDirectory()
   const { results: products } = await Product.getProducts(config.product);
   
   const finalProducts = products.map(({title, permalink, id, seller, price }) => {
    const { nickname, permalink: sellerLink } = seller;

    return {
        id,
        title,
        price,
        permalink,
        nickname,
        sellerLink,
    }
   })


    const header = buildHeader();
    const body = buildBody(finalProducts);

    await writeCSV(header, body)
}

start()