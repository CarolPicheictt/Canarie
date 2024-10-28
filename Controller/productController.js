const ProductModel = require('../Model/productModel');

class ProductController {
    static getAllProducts(req, res) {
        ProductModel.getAllProducts((err, products) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json(products);
        });
    }

    static getProductsWithCategory(req, res) {
        ProductModel.getProductsWithCategory((err, products) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json(products);
        });
    }
}

module.exports = ProductController;
