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
import Item from './services/Item.js';


const buildHeader = () => {
    return config.columns.map(({ name }) => name).join(';') + "\n";
}

const formatProduct = (product) => {
    return config.columns.map(({ key }) => product[key]).join(";")
}

const buildBody = (products) => {
    return products.map(formatProduct).join("\n");
}

async function start() {
   const { results: products } = await Product.getProducts(config.product);

   const finalProducts = products.map(({ title, permalink, id, seller, price, sold_quantity }) => {
    const { nickname, permalink: sellerLink } = seller;

    return {
        id,
        title,
        price,
        permalink,
        nickname,
        sellerLink,
        sold_quantity
    }
   })

   const productsWithAttributes = [];
   
   for(let product of finalProducts) {
    const { attributes } = await Item.getItem(product.id);

    const attributesToAdd = attributes
        .filter(({ id }) => config.item_attributes.find((name) => name.toLowerCase() === id.toLowerCase()))
        .reduce((acc, att) => ({
            ...acc, 
            [att.id.toLowerCase()]: att.value_name
        }), {});
        

    productsWithAttributes.push({
        ...product,
        ...attributesToAdd
    });
   }  

    const header = buildHeader();
    const body = buildBody(productsWithAttributes);

    await writeCSV(header, body)
}

start()