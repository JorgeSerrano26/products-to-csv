const product = "cubiertas de moto offroad";

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
        },
        {
            "key": "sold_quantity",
            "name": "Cantidad ventida"
        },
        {
            "key": "model",
            "name": "Modelo"
        },
        {
            "key": "brand",
            "name": "Marca"
        },
        {
            "key": "manufacturer_tire_size",
            "name": "Tamaño"
        }
    ],
    item_attributes: ['model', 'brand', 'manufacturer_tire_size']
}
export default config;