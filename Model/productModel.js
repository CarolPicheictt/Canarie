const connection = require('../dbMySQL');

class ProductModel {
    static getAllProducts(callback) {
        connection.query('SELECT * FROM produtos', (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    static getProductsWithCategory(callback) {
        connection.query('SELECT p.*, c.descCategoria FROM produtos p JOIN categoria c ON p.id_categoria = c.id_categoria', (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }
}

module.exports = ProductModel;
