const connection = require('../dbMySQL');

const NoticiaModel = {
    getAllNoticias: (callback) => {
        connection.query('SELECT * FROM noticias', (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },
    
    getNoticiaById: (id_noticia, callback) => {
        connection.query('SELECT * FROM noticias WHERE id_noticia = ?', [id_noticia], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        });
    }
};

module.exports = NoticiaModel;
