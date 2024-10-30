
/*-----Conexão com o banco de dados----- */
require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar o Banco de Dados:', err);
        return;
    }
    console.log('Conexão com o MySQL estabelecida com sucesso!');
});

module.exports = connection; // Exporta a conexão para uso em outros arquivos
