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

const getTotalPages = (total, limit) => {
    const pages = Math.trunc(total / limit);
    const extraPage = (total % limit === 0) ? 0 : 1;
    return pages + extraPage;
}

const filterRepeated = (products = []) => {
    let unique = [];

    for (let i = 0; i < products.length; i++) {
        const el = products[i];

        if (!unique.find(p => p.id === el.id)) {
            unique.push(el);
        }
    }

    return unique;
}

async function start() {
    console.log("Retrieving packs, page: 1")

    const { results: products, paging } = await Product.getProducts(config.product);
    const { total, limit } = paging;

    const totalPages = getTotalPages(total, limit);

    let allProducts = [...products];

    for (let page = 1; page < totalPages; page++) {
        console.log(`Retrieving packs, page ${page + 1}`)
        const { results: products } = await Product.getProducts(config.product, page);

        allProducts = [...allProducts, ...products];
    }

    console.log(`Total results found: ${allProducts.length} products`)

    const filteredProducts = filterRepeated(allProducts)

    console.log(`Total unique products: ${filteredProducts.length} products`)

    const finalProducts = filteredProducts.map(({ title, permalink, id, seller, price, sold_quantity }) => {
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

    console.log(`Processing products`)
    for (let product of finalProducts) {
        console.log("Progress: " + (productsWithAttributes.length * 100) / finalProducts.length + "%");
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
    
    console.log(`${finalProducts.length} products processed`)

    const header = buildHeader();
    const body = buildBody(productsWithAttributes);

    await writeCSV(header, body)
}

start()