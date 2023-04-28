const product = "iphone 12";

const config = {
    baseUrl: "https://api.mercadolibre.com/",
    product,
    fileName: `${product}-${Date.now()}.csv`,
    dir: `./files`,
    columns: [
        {
            "key": "id",
            "name": "id del Producto"
        },
        {
            "key": "title",
            "name": "Nombre"
        },
        {
            "key": "price",
            "name": "Precio"
        },
        {
            "key": "permalink",
            "name": "Link del producto"
        },
        {
            "key": "nickname",
            "name": "Vendedor"
        },
        {
            "key": "sellerLink",
            "name": "url al vendedor"
        }
    ],
}
export default config;